import React from 'react'
import 'tailwindcss/tailwind.css'

import { SearchBar } from './Components/SearchBar'
import { Results } from './Components/Results'
import { Landing } from './Components/Landing'
import { LoadingPop } from './Components/LoadingPop'
import { PopUpListing } from './Components/PopUpListing'
import { PopUpSearchSettings } from './Components/PopUpSearchSettings'
import { PopUpLogSign } from './Components/PopUpLogSign'
import { Sidebar } from './Components/Sidebar'
import { UserLikes } from './Components/UserLikes'
import { Repairs } from './Components/Repairs'
import { UserAccount } from './Components/UserAccount'
import { Community } from './Components/Community'
import { checkIfSignInByLink, isUserSignedIn } from './feature/login'

import imagePlaceholder from './assets/gallery.png'

import { hotjar } from 'react-hotjar'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Data: [],
      AccessToken: 'none',
      ExpiryDate: 0,
      resultsDisplay: '⚡️ Trending ⚡️',
      mainDisplay: 'Landing', // "Results"  //  "Loading" // "UserLikes" // "Landing"// "Repairs" //"UserAccount" // Community
      gridView: 'Images Only', // "Image + Description"
      filters: {
        sites: {
          ebay: true,
          trashnothing: true,
          etsy: true,
          facebook: true,
          gumtree: true,
          depop: true,
        },
        range: {
          min: 0,
          max: 100000000,
        },
      },
      searchTerm: '',
      landing: true,
      popUpListing: {
        display: false,
        listing: {},
      },
      popUpGeneral: null,
      popUpSearchSettings: {
        display: false,
        maxResultPrice: 1000,
      },
      depopData: {
        data: [{ nothing: 'none' }],
        status: 'unresolved',
      },
      gumtreeData: {
        data: [{ nothing: 'none' }],
        status: 'unresolved',
      },
      facebookData: {
        data: [{ nothing: 'none' }],
        status: 'unresolved',
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.setData = this.setData.bind(this)
    this.reOrderDisplay = this.reOrderDisplay.bind(this)
    this.togglePopUp = this.togglePopUp.bind(this)
    this.toggleLanding = this.toggleLanding.bind(this)
    this.changeActiveListing = this.changeActiveListing.bind(this)
    this.toggleSearchSettings = this.toggleSearchSettings.bind(this)
    this.setSiteFilters = this.setSiteFilters.bind(this)
    this.toggleMainDisplay = this.toggleMainDisplay.bind(this)
  }

  componentDidMount() {
    checkIfSignInByLink().then(({ ok }) => {
      if (ok) {
        this.setState({ popUpGeneral: null })
      }
    })
    /////////FUNCTIONS AND CONSTANTS
    const appLoaded = Date.now()
    const getEbayAccessToken = () => {
      if (Date.now() > this.state.ExpiryDate) {
        console.log(
          'this app does not have an access token, getting access token'
        )

        var myHeaders = new Headers()
        myHeaders.append(
          'Authorization',
          'Basic Sm9zZXBoVW4tTG9tYS1QUkQtMTk5YWQwZDkwLWY0Y2QyYjg4OlBSRC05OWFkMGQ5MDRiYjEtZjYzMS00OGMyLTkwNTQtYTQ5Yg=='
        )
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        myHeaders.append(
          'Cookie',
          'ebay=%5Esbf%3D%23%5E; dp1=bu1p/QEBfX0BAX19AQA**6379634c^'
        )

        var urlencoded = new URLSearchParams()
        urlencoded.append('grant_type', 'client_credentials')
        urlencoded.append('scope', 'https://api.ebay.com/oauth/api_scope')

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow',
        }

        fetch(
          'https://loma-cors.herokuapp.com/https://api.ebay.com/identity/v1/oauth2/token',
          requestOptions
        )
          .then((response) => response.json())
          .then((jsonresponse) => {
            this.setState({
              AccessToken: jsonresponse.access_token,
              ExpiryDate: Date.now() + jsonresponse.expires_in * 1000,
            })
            let accessTokenSet = Date.now() - appLoaded
            console.log(
              `apiAccessToken = ${this.state.AccessToken}, took ${accessTokenSet} milliseconds`
            )
          })
          .catch((error) => console.log('error', error))
      }
    }

    ///////<DATA CLEANERS>
    const isNull = (property) => {
      if (property === null || property === undefined) {
        return ' '
      } else {
        return property
      }
    }

    const facebookPriceParsed = (price) => {
      let rawPrice = price.substring(1)
      if (!price || price === 'FREE') {
        return '0'
      } else if (price === 'See listings near me') {
        return '~'
      } else if (!rawPrice.includes('£')) {
        return rawPrice
      } else if (rawPrice.includes('£')) {
        return rawPrice.substring(0, rawPrice.indexOf('£'))
      }
    }

    const isPriceNull = (price) => {
      if (price === undefined || price === null) {
        return '~'
      } else {
        return price.substring(1)
      }
    }

    const missingImagesFiltered = (imageProp) => {
      if (imageProp === null || imageProp === undefined) {
        return imagePlaceholder
      } else {
        return imageProp
      }
    }
    ///////</DATA CLEANERS END>
    const getDepopData = async () => {
      console.log('getting depop data')

      const depop_url =
        'https://api.apify.com/v2/datasets/ml97NZifdmN1EFUSb/items?clean=true&format=json'
      const depopResponse = await fetch(depop_url)
      const depopData = await depopResponse.json()

      const depopDataParsed = await depopData.map((listing) => {
        return {
          title: isNull(listing.title),
          price: isPriceNull(listing.price),
          description: isNull(listing.description),
          image: isNull(missingImagesFiltered(listing.image)),
          url: isNull(listing.url),
          site: 'depop',
        }
      })

      this.setState({
        depopData: {
          data: depopDataParsed,
          status: 'resolved',
        },
      })

      let depopDataSetTime = Date.now() - appLoaded

      console.log(
        'depop data has been set, it took this many milliseconds: ' +
          depopDataSetTime
      )
    }

    ///

    const getGumtreeData = async () => {
      console.log('getting gumtree data')

      const gumtree_url =
        'https://api.apify.com/v2/datasets/Dh5XzAb9fvidWw285/items?format=json&clean=1'
      const gumtreeResponse = await fetch(gumtree_url)
      const gumtreeData = await gumtreeResponse.json()

      const gumtreeDataParsed = await gumtreeData.map((listing) => {
        return {
          title: listing.title,
          price: listing.price.substring(1),
          description: listing.description,
          image: missingImagesFiltered(listing.image),
          url: listing.url,
          site: 'gumtree',
        }
      })

      this.setState({
        gumtreeData: {
          data: gumtreeDataParsed,
          status: 'resolved',
        },
      })
      let gumtreeDataSetTime = Date.now() - appLoaded

      console.log(
        'gumtree data has been set, it took this many milliseconds: ' +
          gumtreeDataSetTime
      )
    }

    ///

    const getFacebookData = async () => {
      console.log('getting facebook data')

      const facebook_url =
        'https://api.apify.com/v2/datasets/IitkxYE95yydtzFlk/items?clean=true&format=json'
      const facebookResponse = await fetch(facebook_url)
      const facebookData = await facebookResponse.json()

      const facebookDataParsed = facebookData.map((listing) => {
        return {
          title: '' + isNull(listing.title),
          price: '' + facebookPriceParsed(listing.price),
          description: '' + isNull(listing.description),
          image: '' + missingImagesFiltered(listing.image),
          url: '' + isNull(listing.url),
          site: 'facebook',
        }
      })

      this.setState({
        facebookData: {
          data: facebookDataParsed,
          status: 'resolved',
        },
      })

      let facebookDataSetTime = Date.now() - appLoaded

      console.log(
        'facebook data has been set, it took this many milliseconds: ' +
          facebookDataSetTime
      )
    }

    ///////
    // getEbayAccessToken();
    // getDepopData();
    // getGumtreeData();
    // getFacebookData();
    // hotjar.initialize(2123002,6);
    // console.log("access token" +  this.state.AccessToken);
  } //COMPONENT MOUNT ENDS

  async toggleMainDisplay(newDisplay) {
    await this.setState({
      mainDisplay: newDisplay,
    })
  }
  async setSiteFilters(
    newSearchTerm,
    eBayFilter,
    trashNothingFilter,
    etsyFilter,
    facebookFilter,
    gumtreeFilter,
    depopFilter,
    minRange,
    maxRange,
    sortOrder,
    gridView
  ) {
    await this.setState((prevState) => ({
      resultsDisplay: sortOrder,
      gridView: gridView,
      filters: {
        sites: {
          ebay: eBayFilter,
          trashnothing: trashNothingFilter,
          etsy: etsyFilter,
          facebook: facebookFilter,
          gumtree: gumtreeFilter,
          depop: depopFilter,
        },
        range: {
          min: minRange,
          max: maxRange,
        },
      },
      searchTerm: newSearchTerm,
      popUpSearchSettings: {
        display: !prevState.popUpSearchSettings.display,
        maxResultPrice: prevState.popUpSearchSettings.maxResultPrice,
      },
    }))
    console.log(this.state.filters)
    this.setData(newSearchTerm)
  }

  async toggleSearchSettings() {
    console.log('search settings toggled')
    if (this.state.popUpSearchSettings.display === true) {
      await this.setState({
        popUpSearchSettings: {
          display: false,
        },
      })
    } else if (this.state.popUpSearchSettings.display === false) {
      let highestPrice = await this.state.Data.reduce(function (current, item) {
        if (item.price !== '~') {
          return current > Number(item.price) ? current : Number(item.price)
        } else {
          return item.price
        }
      }, 0)

      console.log(highestPrice)

      this.setState({
        popUpSearchSettings: {
          display: true,
          maxResultPrice: highestPrice,
        },
      })
    }
  }

  handleChange(searchQuery) {
    this.setState({ searchTerm: searchQuery })
    this.setData(searchQuery)
  }

  togglePopUp(listing) {
    if (this.state.popUpListing.display === true) {
      this.setState({
        popUpListing: {
          display: false,
          listing: {},
        },
      })
    } else {
      console.log(listing)
      if (!isUserSignedIn()) {
        this.setState({ popUpGeneral: 'PopUpLogSign' })
        return
      }
      this.setState({
        popUpListing: {
          display: true,
          listing: listing,
        },
      })
    }
  }

  changeActiveListing(listing, direction) {
    let currentActiveListingIndex = this.state.Data.indexOf(listing)

    if (direction === 'next') {
      this.setState((prevState) => ({
        popUpListing: {
          display: true,
          listing: prevState.Data[currentActiveListingIndex + 1],
        },
      }))
    } else if (direction === 'previous' && currentActiveListingIndex > 0) {
      this.setState((prevState) => ({
        popUpListing: {
          display: true,
          listing: prevState.Data[currentActiveListingIndex - 1],
        },
      }))
    } else {
      return
    }
  }

  toggleLanding() {
    this.setState({
      landing: true,
    })
  }

  async reOrderDisplay(sortOrder) {
    /// functions
    await this.setState({ resultsDisplay: sortOrder })

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    }

    function highest(a, b) {
      if (Number(a.price) < Number(b.price)) {
        return 1
      }
      if (Number(a.price) > Number(b.price)) {
        return -1
      }
      return 0
    }

    function lowest(a, b) {
      if (Number(a.price) < Number(b.price)) {
        return -1
      }
      if (Number(a.price) > Number(b.price)) {
        return 1
      }
      return 0
    }

    if (this.state.Data) {
      if (this.state.resultsDisplay === '⚡️ Trending ⚡️') {
        this.setState({ Data: shuffleArray(this.state.Data) })
      } else if (this.state.resultsDisplay === 'Highest price first ▲') {
        this.setState({ Data: this.state.Data.sort(highest) })
      } else if (this.state.resultsDisplay === 'Lowest price first ▼') {
        this.setState({ Data: this.state.Data.sort(lowest) })
      }
    }
  }

  setData(searchQuery) {
    ///<Functions and constants

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    }

    const isNull = (property) => {
      if (property === null || property === undefined) {
        return ' '
      } else {
        return property
      }
    }

    const isPriceNull = (price) => {
      if (price === undefined || price === null) {
        return '~'
      } else {
        return price.substring(1)
      }
    }

    const ebayPriceParsed = (listing) => {
      if (listing.price.currency === 'USD') {
        return listing.price.convertedFromValue
          ? listing.price.convertedFromValue
          : listing.price.value
      } else {
        return listing.price.value
      }
    }

    const facebookPriceParsed = (price) => {
      let rawPrice = price.substring(1)
      if (!price || price === 'FREE') {
        return '0'
      } else if (price === 'See listings near me') {
        return '~'
      } else if (!rawPrice.includes('£')) {
        return rawPrice
      } else if (rawPrice.includes('£')) {
        return rawPrice.substring(0, rawPrice.indexOf('£'))
      }
    }

    const missingImagesFiltered = (imageProp) => {
      if (imageProp === null || imageProp === undefined) {
        return imagePlaceholder
      } else {
        return imageProp
      }
    }

    const tnmissingImagesFiltered = (listing) => {
      if (!listing.photos) {
        return imagePlaceholder
      } else {
        return listing.photos[0].url
      }
    }

    const eBayMissingImagesFiltered = (listing) => {
      if (
        !listing.hasOwnProperty('image') ||
        !listing.image.hasOwnProperty('imageUrl')
      ) {
        return imagePlaceholder
      } else {
        return listing.thumbnailImages[0].imageUrl
      }
    }

    ///<Data calls

    const setEbayData = async () => {
      if (this.state.AccessToken === 'none') {
        console.log('this does not have an access token')

        var myHeaders = new Headers()
        myHeaders.append(
          'Authorization',
          'Basic Sm9zZXBoVW4tTG9tYS1QUkQtMTk5YWQwZDkwLWY0Y2QyYjg4OlBSRC05OWFkMGQ5MDRiYjEtZjYzMS00OGMyLTkwNTQtYTQ5Yg=='
        )
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        myHeaders.append(
          'Cookie',
          'ebay=%5Esbf%3D%23%5E; dp1=bu1p/QEBfX0BAX19AQA**6379634c^'
        )

        var urlencoded = new URLSearchParams()
        urlencoded.append('grant_type', 'client_credentials')
        urlencoded.append('scope', 'https://api.ebay.com/oauth/api_scope')

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow',
        }

        const tokenResponse = await fetch(
          'https://loma-cors.herokuapp.com/https://api.ebay.com/identity/v1/oauth2/token',
          requestOptions
        )
        const jsonToken = await tokenResponse.json()
        const accessToken = jsonToken.access_token

        await this.setState({
          AccessToken: accessToken,
          ExpiryDate: Date.now() + accessToken.expires_in * 1000,
        })
      }
      console.log('fetching ebay data')
      var ebayHeaders = new Headers()
      ebayHeaders.append('Authorization', `Bearer ${this.state.AccessToken}`)
      ebayHeaders.append('Content-Type', 'application/json')
      ebayHeaders.append('X-EBAY-C-MARKETPLACE-ID', 'EBAY_US')
      ebayHeaders.append(
        'X-EBAY-C-ENDUSERCTX',
        'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>'
      )

      var ebayrequestOptions = {
        method: 'GET',
        headers: ebayHeaders,
        redirect: 'follow',
      }

      const ebayresponse = await fetch(
        `https://loma-cors.herokuapp.com/https://api.ebay.com/buy/browse/v1/item_summary/search?q=${searchQuery}&limit=200&filter=price:[${this.state.filters.range.min}..${this.state.filters.range.max}],priceCurrency:GBP,conditions:{UNSPECIFIED|USED},itemLocationCountry:GB&fieldgroups=EXTENDED`,
        ebayrequestOptions
      )
      const jsonresponse = await ebayresponse.json()
      const ebayDataParsed = () => {
        if (jsonresponse.itemSummaries) {
          return jsonresponse.itemSummaries.map((listing) => {
            return {
              title: isNull(listing.title),
              description: isNull(listing.shortDescription),
              price: isNull(ebayPriceParsed(listing)),
              image: eBayMissingImagesFiltered(listing),
              url: isNull(listing.itemWebUrl),
              site: 'ebay',
            }
          })
        } else {
          return []
        }
      }

      this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: [...prevState.Data, ...ebayDataParsed()],
      }))
      this.reOrderDisplay(this.state.resultsDisplay)
    }

    const setDepopData = async () => {
      if (this.state.depopData.status === 'unresolved') {
        const depop_url =
          'https://api.apify.com/v2/datasets/ml97NZifdmN1EFUSb/items?clean=true&format=json'
        const depopResponse = await fetch(depop_url)
        const depopData = await depopResponse.json()
        const depopDataFiltered = depopData.filter((listing) => {
          if (
            isNull(listing.title)
              .toLowerCase()
              .includes(this.state.searchTerm) &&
            listing.price >= this.state.filters.range.min &&
            listing.price <= this.state.filters.range.max
          ) {
            return true
          } else if (
            isNull(listing.description)
              .toLowerCase()
              .includes(this.state.searchTerm) &&
            listing.price >= this.state.filters.range.min &&
            listing.price <= this.state.filters.range.max
          ) {
            return true
          } else {
            return false
          }
        })

        const depopDataParsed = depopDataFiltered.map((listing) => {
          return {
            title: isNull(listing.title),
            price: isPriceNull(listing.price),
            description: isNull(listing.description),
            image: isNull(missingImagesFiltered(listing.image)),
            url: isNull(listing.url),
            site: 'depop',
          }
        })

        this.setState({
          depopData: {
            data: depopDataParsed,
            status: 'resolved',
          },
        })

        this.setState((prevState) => ({
          loading: false,
          Data: [...prevState.Data, ...depopDataParsed],
        }))
        this.reOrderDisplay(this.state.resultsDisplay)
      } else if (this.state.depopData.status === 'resolved') {
        const depopDataFiltered = this.state.depopData.data.filter(
          (listing) => {
            if (
              isNull(listing.title)
                .toLowerCase()
                .includes(this.state.searchTerm) &&
              listing.price >= this.state.filters.range.min &&
              listing.price <= this.state.filters.range.max
            ) {
              return true
            } else if (
              isNull(listing.description)
                .toLowerCase()
                .includes(this.state.searchTerm) &&
              listing.price >= this.state.filters.range.min &&
              listing.price <= this.state.filters.range.max
            ) {
              return true
            } else {
              return false
            }
          }
        )
        this.setState((prevState) => ({
          Data: [...prevState.Data, ...depopDataFiltered],
        }))
        this.reOrderDisplay(this.state.resultsDisplay)
      }
    }

    const setGumtreeData = async () => {
      if (this.state.gumtreeData.status === 'unresolved') {
        const gumtree_url =
          'https://api.apify.com/v2/datasets/Dh5XzAb9fvidWw285/items?format=json&clean=1'
        const gumtreeResponse = await fetch(gumtree_url)
        const gumtreeData = await gumtreeResponse.json()
        const gumtreeDataFiltered = gumtreeData.filter((listing) => {
          if (
            isNull(listing.title)
              .toLowerCase()
              .includes(this.state.searchTerm) &&
            listing.price >= this.state.filters.range.min &&
            listing.price <= this.state.filters.range.max
          ) {
            return true
          } else if (
            isNull(listing.description)
              .toLowerCase()
              .includes(this.state.searchTerm) &&
            listing.price >= this.state.filters.range.min &&
            listing.price <= this.state.filters.range.max
          ) {
            return true
          } else {
            return false
          }
        })

        const gumtreeDataParsed = gumtreeDataFiltered.map((listing) => {
          return {
            title: listing.title,
            price: listing.price.substring(1),
            description: listing.description,
            image: missingImagesFiltered(listing.image),
            url: listing.url,
            site: 'gumtree',
          }
        })

        this.setState({
          depopData: {
            data: gumtreeDataParsed,
            status: 'resolved',
          },
        })

        this.setState((prevState) => ({
          mainDisplay: 'Results',
          Data: [...prevState.Data, ...gumtreeDataFiltered],
        }))
        this.reOrderDisplay(this.state.resultsDisplay)
      } else {
        const gumtreeDataFiltered = this.state.gumtreeData.data.filter(
          (listing) => {
            if (
              isNull(listing.title)
                .toLowerCase()
                .includes(this.state.searchTerm) &&
              listing.price >= this.state.filters.range.min &&
              listing.price <= this.state.filters.range.max
            ) {
              return true
            } else if (
              isNull(listing.description)
                .toLowerCase()
                .includes(this.state.searchTerm) &&
              listing.price >= this.state.filters.range.min &&
              listing.price <= this.state.filters.range.max
            ) {
              return true
            } else {
              return false
            }
          }
        )
        this.setState((prevState) => ({
          Data: [...prevState.Data, ...gumtreeDataFiltered],
        }))
        this.reOrderDisplay(this.state.resultsDisplay)
      }
    }

    const setFacebookData = async () => {
      if (this.state.facebookData.status === 'unresolved') {
        const facebook_url =
          'https://api.apify.com/v2/datasets/IitkxYE95yydtzFlk/items?clean=true&format=json'
        const facebookResponse = await fetch(facebook_url)
        const facebookData = await facebookResponse.json()
        const facebookDataFiltered = facebookData.filter((listing) => {
          if (
            isNull(listing.title)
              .toLowerCase()
              .includes(this.state.searchTerm) &&
            listing.price >= this.state.filters.range.min &&
            listing.price <= this.state.filters.range.max
          ) {
            return true
          } else if (
            isNull(listing.description)
              .toLowerCase()
              .includes(this.state.searchTerm) &&
            listing.price >= this.state.filters.range.min &&
            listing.price <= this.state.filters.range.max
          ) {
            return true
          } else {
            return false
          }
        })

        const facebookDataParsed = facebookDataFiltered.map((listing) => {
          return {
            title: '' + isNull(listing.title),
            price: '' + facebookPriceParsed(listing.price),
            description: '' + isNull(listing.description),
            image: '' + missingImagesFiltered(listing.image),
            url: '' + isNull(listing.url),
            site: 'facebook',
          }
        })

        this.setState({
          facebookData: {
            data: facebookDataParsed,
            status: 'resolved',
          },
        })

        this.setState((prevState) => ({
          mainDisplay: 'Results',
          Data: [...prevState.Data, ...facebookDataFiltered],
        }))
        this.reOrderDisplay(this.state.resultsDisplay)
      } else {
        const facebookDataFiltered = this.state.facebookData.data.filter(
          (listing) => {
            if (
              isNull(listing.title)
                .toLowerCase()
                .includes(this.state.searchTerm) &&
              listing.price >= this.state.filters.range.min &&
              listing.price <= this.state.filters.range.max
            ) {
              return true
            } else if (
              isNull(listing.description)
                .toLowerCase()
                .includes(this.state.searchTerm) &&
              listing.price >= this.state.filters.range.min &&
              listing.price <= this.state.filters.range.max
            ) {
              return true
            } else {
              return false
            }
          }
        )
        this.setState((prevState) => ({
          Data: [...prevState.Data, ...facebookDataFiltered],
        }))
        this.reOrderDisplay(this.state.resultsDisplay)
      }
    }

    const setEtsyData = async () => {
      const etsyRaw = await fetch(
        `https://loma-cors.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=${searchQuery}&tags=vintage&limit=200&location=UK&api_key=sh1n3isgj6bax7eotlor7m4s&includes=Images&min_price=${this.state.filters.range.min}&max_price=${this.state.filters.range.max}&sort_on=score&sort_order=down`
      )
      const etsyJson = await etsyRaw.json()
      const etsyDataResults = etsyJson.results
      const etsyData = etsyDataResults.map((listing) => {
        let etsyFirstImage = listing.Images
          ? missingImagesFiltered(listing.Images[0].url_570xN)
          : imagePlaceholder
        return {
          title: listing.title,
          price: listing.price,
          description: listing.description,
          image: etsyFirstImage,
          url: listing.url,
          site: 'etsy',
        }
      })

      this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: [...prevState.Data, ...etsyData],
      }))
      this.reOrderDisplay(this.state.resultsDisplay)
    }

    const setTrashNothingData = async () => {
      const trashnothingRaw = await fetch(
        `https://trashnothing.com/api/v1.2/posts/search?search=${searchQuery}&sort_by=relevance&types=offer&sources=trashnothing&per_page=50&page=4&device_pixel_ratio=1&latitude=51.507351&longitude=-0.127758&radius=200000&api_key=yr8sVaHEvbdkdunSFfPoDpqlwEjxIuqB3XhyFzx1`
      )
      const tnJson = await trashnothingRaw.json()
      const tnResults = tnJson.posts
      const trashNothingData = tnResults.map((listing) => {
        return {
          title: listing.title,
          price: 0,
          description: listing.content,
          image: tnmissingImagesFiltered(listing),
          url: listing.url,
          site: 'trashnothing',
        }
      })

      this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: [...prevState.Data, ...trashNothingData],
      }))
      this.reOrderDisplay(this.state.resultsDisplay)
    }

    ///>Data calls
    ////>Functions and constants

    ///<Preliminary checks
    if (!searchQuery) {
      alert('Tell me what to search! 😁')
      return
    }

    console.time('complete search')
    this.setState({
      Data: [],
      searchTerm: searchQuery.toLowerCase(),
      mainDisplay: 'Loading',
    })
    ///>Preliminary checks

    ///<The Timeline
    if (this.state.filters.sites.ebay) {
      setEbayData()
    }

    if (this.state.filters.sites.depop) {
      setDepopData()
    }

    if (this.state.filters.sites.gumtree) {
      setGumtreeData()
    }

    if (this.state.filters.sites.facebook) {
      setFacebookData()
    }

    if (this.state.filters.sites.etsy) {
      setEtsyData()
    }

    if (this.state.filters.sites.trashnothing) {
      setTrashNothingData()
    }
  }

  render() {
    return (
      <div className="max-w-screen-lg h-screen flex flex-row justify-center content-center mx-auto">
        {/* Top layer for popups */}
        {this.state.popUpListing.display ? (
          <PopUpListing
            changeActiveListing={this.changeActiveListing}
            display={this.state.popUpListing.display}
            listing={this.state.popUpListing.listing}
            togglePopUp={this.togglePopUp}
          />
        ) : null}
        {this.state.popUpSearchSettings.display ? (
          <PopUpSearchSettings
            toggleSearchSettings={this.toggleSearchSettings}
            filters={this.state.filters}
            maxResultPrice={this.state.popUpSearchSettings.maxResultPrice}
            searchTerm={this.state.searchTerm}
            display={this.state.resultsDisplay}
            gridView={this.state.gridView}
            setSiteFilters={this.setSiteFilters}
          />
        ) : null}
        {this.state.popUpGeneral === 'PopUpLogSign' ? <PopUpLogSign /> : null}
        {/* Top layer for popups ends */}
        <div className="w-full flex flex-row">
          <div className="se:hidden sm:block">
            <Sidebar toggleMainDisplay={this.toggleMainDisplay} />
          </div>
          <div className="w-full h-full bg-white overflow-x-hidden z-0 border-r">
            {this.state.mainDisplay !== 'UserLikes' &&
            this.state.mainDisplay !== 'Repairs' &&
            this.state.mainDisplay !== 'UserAccount' &&
            this.state.mainDisplay !== 'Community' ? (
              <SearchBar
                onChange={this.handleChange}
                toggleMainDisplay={this.toggleMainDisplay}
                resultsDisplay={this.state.resultsDisplay}
                searchTerm={this.state.searchTerm}
              />
            ) : null}
            {this.state.mainDisplay === 'Landing' ? <Landing /> : null}
            {this.state.mainDisplay === 'Repairs' ? (
              <Repairs toggleMainDisplay={this.toggleMainDisplay} />
            ) : null}
            {this.state.mainDisplay === 'Community' ? (
              <Community toggleMainDisplay={this.toggleMainDisplay} />
            ) : null}
            {this.state.mainDisplay === 'UserLikes' ? (
              <UserLikes toggleMainDisplay={this.toggleMainDisplay} />
            ) : null}
            {this.state.mainDisplay === 'UserAccount' ? (
              <UserAccount toggleMainDisplay={this.toggleMainDisplay} />
            ) : null}
            {this.state.mainDisplay === 'Loading' ? <LoadingPop /> : null}
            {this.state.mainDisplay === 'Results' ? (
              <Results
                Data={this.state.Data}
                resultsDisplay={this.state.resultsDisplay}
                reOrderDisplay={this.reOrderDisplay}
                searchTerm={this.state.searchTerm}
                search={this.handleChange}
                togglePopUp={this.togglePopUp}
                toggleSearchSettings={this.toggleSearchSettings}
                gridView={this.state.gridView}
              />
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default App
