import React from 'react'
import 'tailwindcss/tailwind.css'

import app from '../src/Firebase'
import firebase from 'firebase/app'

import { getFavourites } from './feature/favourites/index'

import { Alert } from './Components/Alert'
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
import { TopNav } from './Components/TopNav'

import imagePlaceholder from './assets/gallery.png'

import { hotjar } from 'react-hotjar'

//////<ALL FUNCTIONS

/////////FIREBASE STUFF
let userObject = {
  signedIn: false,
  uid: '',
  username: '',
  bio: '',
  email: '',
  joinedOn: '',
}
//firebase stuff

const db = firebase.firestore()
const screamsRef = db.collection('screams')

const auth = app.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()

let userId = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid
      return uid
    } else {
      return 'none'
    }
  })
}

//functions

function doesUserObjectExist(userId) {
  db.collection('userObject')
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return true
      } else {
        return false
      }
    })
}

function isEmailValid(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true
  else return false
}
const isPasswordValid = (string) => {
  if (string.length >= 6) return true
  else return false
}

/////////FUNCTIONS AND CONSTANTS
const appLoaded = Date.now()

function alternate(array1, array2) {
  console.log('alternate start. array2 length: ' + array2.length)
  if (array2.length > 0) {
    var result = [],
      i,
      l = Math.min(array1.length, array2.length)

    for (i = 0; i < l; i++) {
      result.push(array1[i], array2[i])
    }
    result.push(...array1.slice(l), ...array2.slice(l))

    console.log('alternate result length: ' + result.length)
    return result
  } else {
    console.log('alternate rejected')
    return array1
  }
}

///////<DATA CLEANERS>
const isNull = (property) => {
  if (property === null || property === undefined) {
    return '~'
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

//////>ALL FUNCTIONS

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false,
      alertMessage: '',
      user: userObject,
      favourites: [],
      Data: [],
      hasSearched: false,
      AccessToken: 'none',
      ExpiryDate: 0,
      resultsDisplay: '⚡️ Trending ⚡️',
      mainDisplay: 'Landing', // "Results"  //  "Loading" // "UserLikes" // "Landing"// "Repairs" //"UserAccount" // Community
      gridView: 'Image + Description', //'Images Only', // "Image + Description"
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
        data: [],
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
    this.getEbayAccessToken = this.getEbayAccessToken.bind(this)
    this.getDepopData = this.getDepopData.bind(this)
    this.getGumtreeData = this.getGumtreeData.bind(this)
    this.getFacebookData = this.getFacebookData.bind(this)
    this.filterApifyData = this.filterApifyData.bind(this)
    this.signUpWithEmailPassword = this.signUpWithEmailPassword.bind(this)
    this.signInGoogle = this.signInGoogle.bind(this)
    this.signOut = this.signOut.bind(this)
    this.addFavourite = this.addFavourite.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.removeFavourite = this.removeFavourite.bind(this)
    this.changeState = this.changeState.bind(this)
  }

  componentDidMount() {
    // this.getEbayAccessToken()
    // this.getDepopData()
    // this.getGumtreeData()
    // this.getFacebookData()
    hotjar.initialize(2123002, 6)
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('bitch is in')
        db.doc(`/userObject/${user.email}`)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('user exists, setting state')
              this.setState({
                user: {
                  signedIn: true,
                  uid: doc.data().uid,
                  username: doc.data().username,
                  bio: doc.data().bio,
                  email: doc.data().email,
                  joinedOn: doc.data().joinedOn,
                },
              })
            }
          })
        db.collection('favourites')
          .where('uid', '==', user.uid)
          .orderBy('createdAt', 'desc')
          .onSnapshot((querySnapshot) => {
            let favouritesList = []
            querySnapshot.forEach((fave) => {
              favouritesList.push({
                title: fave.data().title,
                description: fave.data().description,
                createdAt: fave.data().createdAt,
                image: fave.data().image,
                price: fave.data().price,
                site: fave.data().site,
                uid: fave.data().uid,
                docId: fave.id,
                url: fave.data().url,
              })
            })
            this.setState({
              favourites: favouritesList,
            })
          })
      } else {
        console.log('user signed out')
      }
    })
  } //COMPONENT MOUNT ENDS

  changeState(newState) {
    this.setState(newState)
  }

  updateUser(newUsername, newBio) {
    if (newUsername) {
      ///TODO: validate username if it already exists
      db.collection('userObject')
        .doc(this.state.user.email)
        .update({
          username: newUsername,
          bio: newBio,
        })
        .then(() => {
          this.setState((prevState) => ({
            user: {
              signedIn: prevState.user.signedIn,
              uid: prevState.user.uid,
              username: newUsername,
              bio: newBio,
              email: prevState.user.email,
              joinedOn: prevState.user.joinedOn,
            },
          }))
          this.setState({
            alertVisible: true,
            alertMessage: '👤 Profile successfully updated ',
          })
          setTimeout(() => {
            this.setState({ alertVisible: false })
          }, 2000)
        })
        .catch((error) => {
          alert(error)
        })
    } else {
      alert('Username cannot be left empty')
    }
  }

  removeFavourite(listing) {
    db.collection('favourites')
      .doc(listing.docId)
      .delete()
      .then(() => {
        console.log('listing successfully removed')
        this.setState({
          alertVisible: true,
          alertMessage: '❌ Listing Removed ',
        })
        setTimeout(() => {
          this.setState({ alertVisible: false })
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  addFavourite(listing) {
    if (!this.state.user.signedIn) {
      return alert('Sign in to start saving listings!')
    } else {
      db.collection('favourites')
        .add({
          title: listing.title,
          description: listing.description,
          createdAt: new Date().toISOString(),
          image: listing.image,
          price: listing.price,
          site: listing.site,
          uid: this.state.user.uid,
          url: listing.url,
        })
        .then(() => {
          console.log('listing successfully favourited')
          this.setState({
            alertVisible: true,
            alertMessage: '❤️ Listing saved ',
          })
          setTimeout(() => {
            this.setState({ alertVisible: false })
          }, 2000)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          favourites: [],
          user: {
            signedIn: false,
            uid: '',
            username: '',
            bio: '',
            email: '',
            joinedOn: '',
          },
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  signInGoogle() {
    console.log('signing in with google')
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((userCredentials) => {
        ///does userObject exist?
        db.doc(`/userObject/${userCredentials.user.email}`)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('user already exists, just signing in')
              console.log('listing successfully favourited')
              this.setState({
                alertVisible: true,
                alertMessage: '👋  Welcome back!',
              })
              setTimeout(() => {
                this.setState({ alertVisible: false })
              }, 2000)
              //do nothing
            } else {
              //create userObject
              db.doc(`userObject/${userCredentials.user.email}`).set({
                uid: userCredentials.user.uid,
                username: '',
                bio: '',
                email: userCredentials.user.email,
                joinedOn: new Date().toISOString(),
              })
            }
          })
          .catch((err) => {
            alert(err)
          })
      })
      // .then() needs a set state to update and refresh
      .catch((error) => {})
  }

  signUpWithEmailPassword(rawEmail, rawPassword) {
    //TODO: validate if email and password
    let userEmail

    if (!isEmailValid(rawEmail)) {
      return alert('Email must be valid')
    }

    if (!isPasswordValid(rawPassword)) {
      return alert('Password must be more than 6 characters')
    }

    //2: does user Object exist?
    db.doc(`/userObject/${rawEmail}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          firebase
            .auth()
            .signInWithEmailAndPassword(rawEmail, rawPassword)
            .then((userCredential) => {
              console.log('sign in successful')
              this.setState({
                alertVisible: true,
                alertMessage: '👋 Sign in successful ',
              })
              setTimeout(() => {
                this.setState({ alertVisible: false })
              }, 2000)
            })
            .catch((error) => {
              alert(error)
            })
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(rawEmail, rawPassword)
        }
      })
      .then((userCredentials) => {
        if (userCredentials) {
          console.log('sign in successful')
          this.setState({
            alertVisible: true,
            alertMessage: '👋 Sign in successful ',
          })
          setTimeout(() => {
            this.setState({ alertVisible: false })
          }, 2000)
          db.doc(`userObject/${userCredentials.user.email}`).set({
            uid: userCredentials.user.uid,
            username: '',
            bio: '',
            email: userCredentials.user.email,
            joinedOn: new Date().toISOString(),
          })
          userId = userCredentials.user.uid
          userEmail = userCredentials.user.email
        }
      })
      .catch((err) => {
        alert(err)
      })
  }

  filterApifyData(stateData) {
    if (stateData.length > 0) {
      const filteredData = stateData.filter((listing) => {
        if (
          listing.title.toLowerCase().includes(this.state.searchTerm) &&
          facebookPriceParsed(listing.price) >= this.state.filters.range.min &&
          facebookPriceParsed(listing.price) <= this.state.filters.range.max
        ) {
          return true
        } else if (
          listing.description.toLowerCase().includes(this.state.searchTerm) &&
          facebookPriceParsed(listing.price) >= this.state.filters.range.min &&
          facebookPriceParsed(listing.price) <= this.state.filters.range.max
        ) {
          return true
        } else {
          return false
        }
      })
      console.log('filtered length' + filteredData.length)
      return filteredData
    }
  }

  async getFacebookData() {
    const facebook_url =
      'https://api.apify.com/v2/datasets/IitkxYE95yydtzFlk/items?H4FHJb2qhqB6Td93i~facebook-uk'

    const facebookResponse = await fetch(facebook_url)
    const facebookData = await facebookResponse.json()

    const facebookDataParsed = await facebookData.map((listing) => {
      return {
        title: isNull(listing.title),
        price: facebookPriceParsed(listing.price),
        description: isNull(listing.description),
        image: missingImagesFiltered(listing.image),
        url: listing.url,
        site: 'facebook',
      }
    })

    await this.setState({
      facebookData: {
        data: facebookDataParsed,
        status: 'resolved',
      },
    })

    console.log(
      'facebook data has been set, this how many items there are' +
        this.state.facebookData.data.length
    )
  }

  async getGumtreeData() {
    console.log('getting gumtree data')

    const gumtree_url =
      'https://api.apify.com/v2/datasets/aAVHXcypcKkmWEbZF/items?H4FHJb2qhqB6Td93i~gumtree-uk'
    const gumtreeResponse = await fetch(gumtree_url)
    const gumtreeData = await gumtreeResponse.json()

    const gumtreeDataParsed = await gumtreeData.map((listing) => {
      return {
        title: isNull(listing.title),
        price: isPriceNull(listing.price.substring(1)),
        description: isNull(listing.description),
        image: missingImagesFiltered(listing.image),
        url: listing.url,
        site: 'gumtree',
      }
    })

    await this.setState({
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

  async getDepopData() {
    console.log('getting depop data')

    const depop_url =
      'https://api.apify.com/v2/datasets/F9xfq2ip1WN0hIHKh/items?H4FHJb2qhqB6Td93i~depop-uk'
    const depopResponse = await fetch(depop_url)
    const depopData = await depopResponse.json()

    const depopDataParsed = await depopData.map((listing) => {
      return {
        title: isNull(listing.title),
        price: isPriceNull(listing.price),
        description: isNull(listing.description),
        image: missingImagesFiltered(listing.image),
        url: isNull(listing.url),
        site: 'depop',
      }
    })

    await this.setState({
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

  async getEbayAccessToken() {
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

    // function shuffleArray(array) {
    //   for (var i = array.length - 1; i > 0; i--) {
    //     var j = Math.floor(Math.random() * (i + 1))
    //     var temp = array[i]
    //     array[i] = array[j]
    //     array[j] = temp
    //   }
    //   return array
    // }

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
        // this.setState({ Data: shuffleArray(this.state.Data) })
      } else if (this.state.resultsDisplay === 'Highest price first ▲') {
        this.setState({ Data: this.state.Data.sort(highest) })
      } else if (this.state.resultsDisplay === 'Lowest price first ▼') {
        this.setState({ Data: this.state.Data.sort(lowest) })
      }
    }
  }

  setData(searchQuery) {
    ///<Functions and constants

    // function shuffleArray(array) {
    //   for (var i = array.length - 1; i > 0; i--) {
    //     var j = Math.floor(Math.random() * (i + 1))
    //     var temp = array[i]
    //     array[i] = array[j]
    //     array[j] = temp
    //   }
    //   return array
    // }

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
      let newData = ebayDataParsed()
      await this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: alternate(prevState.Data, newData),
      }))
      this.reOrderDisplay(this.state.resultsDisplay)
    }

    const setDepopData = async () => {
      //timeline
      if (this.state.depopData.status === 'unresolved') {
        await this.getDepopData()
      } else {
      }
      await this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: alternate(
          prevState.Data,
          this.filterApifyData(this.state.depopData.data)
        ),
      }))
      await this.reOrderDisplay(this.state.resultsDisplay)
    }

    const setGumtreeData = async () => {
      ///timeline
      if (this.state.gumtreeData.status === 'unresolved') {
        await this.getGumtreeData()
      } else {
      }
      await this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: alternate(
          prevState.Data,
          this.filterApifyData(this.state.gumtreeData.data)
        ),
      }))
      await this.reOrderDisplay(this.state.resultsDisplay)
    }

    const setFacebookData = async () => {
      ///timeline
      if (this.state.facebookData.status === 'unresolved') {
        await this.getFacebookData()
      } else {
      }
      await this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: alternate(
          prevState.Data,
          this.filterApifyData(this.state.facebookData.data)
        ),
      }))
      await this.reOrderDisplay(this.state.resultsDisplay)
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
      await this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: alternate(prevState.Data, etsyData),
      }))
      await this.reOrderDisplay(this.state.resultsDisplay)
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

      await this.setState((prevState) => ({
        mainDisplay: 'Results',
        Data: alternate(prevState.Data, trashNothingData),
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
      hasSearched: true,
      searchTerm: searchQuery.toLowerCase(),
      mainDisplay: 'Loading',
    })
    ///>Preliminary checks

    //<The Timeline
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
      <div className="w-screen h-screen">
        {/* Top layer for popups */}
        <Alert
          visible={this.state.alertVisible}
          message={this.state.alertMessage}
        />
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
        <div className="max-w-screen-lg h-screen flex flex-row justify-center content-center mx-auto">
          <div className="w-full flex flex-row">
            <div className="se:hidden sm:block">
              <Sidebar
                toggleMainDisplay={this.toggleMainDisplay}
                signedIn={this.state.user.signedIn}
              />
            </div>
            <div className="w-full h-full bg-white overflow-x-hidden z-0 border-r">
              <div className="sm:hidden">
                <TopNav
                  toggleMainDisplay={this.toggleMainDisplay}
                  changeState={this.changeState}
                />
              </div>
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
                <Repairs
                  toggleMainDisplay={this.toggleMainDisplay}
                  signedIn={this.state.user.signedIn}
                  changeState={this.changeState}
                />
              ) : null}
              {this.state.mainDisplay === 'Community' ? (
                <Community
                  toggleMainDisplay={this.toggleMainDisplay}
                  signedIn={this.state.user.signedIn}
                />
              ) : null}
              {this.state.mainDisplay === 'UserLikes' ? (
                <UserLikes
                  favourites={this.state.favourites}
                  removeFavourite={this.removeFavourite}
                  toggleMainDisplay={this.toggleMainDisplay}
                  signedIn={this.state.user.signedIn}
                  togglePopUp={this.togglePopUp}
                />
              ) : null}
              {this.state.mainDisplay === 'UserAccount' ? (
                <UserAccount
                  toggleMainDisplay={this.toggleMainDisplay}
                  signedIn={this.state.user.signedIn}
                  signUpWithEmailPassword={this.signUpWithEmailPassword}
                  signInGoogle={this.signInGoogle}
                  signOut={this.signOut}
                  userObject={this.state.user}
                  favourites={this.state.favourites}
                  updateUser={this.updateUser}
                />
              ) : null}
              {this.state.mainDisplay === 'Loading' ? <LoadingPop /> : null}
              {this.state.mainDisplay === 'Results' ? (
                <Results
                  Data={this.state.Data}
                  hasSearched={this.state.hasSearched}
                  signedIn={this.state.user.signedIn}
                  resultsDisplay={this.state.resultsDisplay}
                  reOrderDisplay={this.reOrderDisplay}
                  searchTerm={this.state.searchTerm}
                  search={this.handleChange}
                  togglePopUp={this.togglePopUp}
                  toggleSearchSettings={this.toggleSearchSettings}
                  gridView={this.state.gridView}
                  addFavourite={this.addFavourite}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
