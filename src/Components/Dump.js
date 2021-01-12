async setData(searchQuery) {
    if (!searchQuery) {
      alert("Tell me what to search! 😁");
      return;
    }

    console.time("complete search")

    this.setState({Data: [], searchTerm: searchQuery.toLowerCase(), loading: true, landing: false});
    
    if (Date.now() > this.state.ExpiryDate) {
      console.log("this app does not have an access token! Getting access token")

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic Sm9zZXBoVW4tTG9tYS1QUkQtMTk5YWQwZDkwLWY0Y2QyYjg4OlBSRC05OWFkMGQ5MDRiYjEtZjYzMS00OGMyLTkwNTQtYTQ5Yg==");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Cookie", "ebay=%5Esbf%3D%23%5E; dp1=bu1p/QEBfX0BAX19AQA**6379634c^");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "client_credentials");
      urlencoded.append("scope", "https://api.ebay.com/oauth/api_scope");
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      
      fetch("https://loma-cors.herokuapp.com/https://api.ebay.com/identity/v1/oauth2/token", requestOptions)
          .then(response => response.json())
          .then(jsonresponse => {
            this.setState({
              AccessToken: jsonresponse.access_token,
              ExpiryDate: new Date().getTime() + jsonresponse.expires_in * 1000
            })
          })
          .catch(error => console.log('error', error));
    } else {
      console.log("this has an access token" + this.state.AccessToken.substring(10,25));
    }

    // console.log("access token" + this.state.AccessToken);
   // let formattedExpiryDate = this.state.ExpiryDate * 1000;
    //console.log(formattedExpiryDate.toUTCString())



    /////////////////////DATA CLEANERS///////////////////////////
    const isNull = (property) => {
      if (property === null || property === undefined) {
      return " ";
      } else {
        return property;
      }
    };

    const isPriceNull = (price) => {
      if (price === undefined || price === null) {
        return "~";
      } else {
        return price.substring(1)
      }
    };

    const ebayPriceParsed = (listing) => {
      if (listing.price.currency === "USD") {
        return listing.price.convertedFromValue ? listing.price.convertedFromValue : listing.price.value;
      } else {
        return listing.price.value;
      }
    };

    const facebookPriceParsed = (price) => {
      let rawPrice = price.substring(1);
      if (!price || price === "FREE") {
        return "0"
      } else if (price === "See listings near me") {
        return "~"
      } else if (!rawPrice.includes("£")){
        return rawPrice;
      } else if (rawPrice.includes("£")) {
        return rawPrice.substring(0, rawPrice.indexOf("£"));
      }
    };

    const missingImagesFiltered = (imageProp) => {
      if (imageProp === null || imageProp === undefined) {
        return imagePlaceholder;
      } else {
        return imageProp;
      }
    }

    const tnmissingImagesFiltered = (listing) => {
      if (!listing.photos) {
        return imagePlaceholder
      } else {
        return listing.photos[0].url;
      }
    }

    const eBayMissingImagesFiltered = (listing) => {
      if (!listing.hasOwnProperty("image") || !listing.image.hasOwnProperty("imageUrl")) {
        return imagePlaceholder;
      } else {
        return listing.thumbnailImages[0].imageUrl;
      }
    }
    /////END OF CLEANER FUNCTIONS
    /////GET EBAY DATA

    var ebayHeaders = new Headers();
    ebayHeaders.append("Authorization", `Bearer ${this.state.AccessToken}`);
    ebayHeaders.append("Content-Type", "application/json");
    ebayHeaders.append("X-EBAY-C-MARKETPLACE-ID", "EBAY_US");
    ebayHeaders.append("X-EBAY-C-ENDUSERCTX", "affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>");
    
    var ebayrequestOptions = {
      method: 'GET',
      headers: ebayHeaders,
      redirect: 'follow'
    };   

    
    const ebayresponse = await fetch(`https://loma-cors.herokuapp.com/https://api.ebay.com/buy/browse/v1/item_summary/search?q=${searchQuery}&limit=200&filter=conditions:{UNSPECIFIED|USED},itemLocationCountry:GB&fieldgroups=EXTENDED`, ebayrequestOptions);
    const jsonresponse = await ebayresponse.json();
    const ebayDataParsed = () => {
      if (jsonresponse.itemSummaries) {
          return jsonresponse.itemSummaries.map(
            (listing) => {
                return {
                    title: isNull(listing.title),
                    description: isNull(listing.shortDescription),
                    price: isNull(ebayPriceParsed(listing)),
                    image: eBayMissingImagesFiltered(listing),
                    url: isNull(listing.itemWebUrl),
                    site: "ebay"
                }
            }
        )
      } else { 
        return [];
      }
    }

    this.setState(prevState => ({Data: [...prevState.Data,...ebayDataParsed()]}));

    /////////////GET DEPOP DATA

    if (this.state.depopData.status === "unresolved") {
      const depop_url = "https://api.apify.com/v2/datasets/ml97NZifdmN1EFUSb/items?clean=true&format=json";
      const depopResponse = await fetch(depop_url);
      const depopData = await depopResponse.json();
      const depopDataFiltered = depopData.filter( (listing) => {
        if (isNull(listing.title).toLowerCase().includes(this.state.searchTerm)) {
          return true;
        } else if (isNull(listing.description).toLowerCase().includes(this.state.searchTerm)) {
          return true;
        } else {
          return false;
        }
      })
        // || isNull(listing.description).includes(this.state.searchTerm));
      
      const depopDataParsed = depopDataFiltered.map(
        (listing) => {
          return {
            title: isNull(listing.title),
            price: isPriceNull(listing.price),
            description: isNull(listing.description),
            image: isNull(missingImagesFiltered(listing.image)),
            url: isNull(listing.url),
            site: "depop"
          }
        }
      )

      this.setState({
        depopData : {
          data: depopDataParsed,
          status: 'resolved'
        }
      });

      this.setState(prevState => ({Data: [...prevState.Data,...depopDataParsed]}));

    } else if (this.state.depopData.status === "resolved") {
      const depopDataFiltered = this.state.depopData.data.filter((listing) => {
        if (isNull(listing.title).toLowerCase().includes(this.state.searchTerm)) {
          return true;
        } else if (isNull(listing.description).toLowerCase().includes(this.state.searchTerm)) {
          return true;
        } else {
          return false;
        }
      });
      this.setState(prevState => ({Data: [...prevState.Data,...depopDataFiltered]}));
    }
    
    if (this.state.gumtreeData.status === "unresolved") {
      const gumtree_url = "https://api.apify.com/v2/datasets/Dh5XzAb9fvidWw285/items?format=json&clean=1"
      const gumtreeResponse = await fetch(gumtree_url);
      const gumtreeData = await gumtreeResponse.json();
      const gumtreeDataFiltered = gumtreeData.filter( listing =>
        listing.title.toLowerCase().includes(this.state.searchTerm) || listing.description.toLowerCase().includes(this.state.searchTerm));
  
      const gumtreeDataParsed = gumtreeDataFiltered.map(
        listing => {
          return {
            title: listing.title,
            price: listing.price.substring(1),
            description: listing.description,
            image: missingImagesFiltered(listing.image),
            url: listing.url,
            site: "gumtree"
          }
        }
      )

      this.setState({
        depopData : {
          data: gumtreeDataParsed,
          status: 'resolved'
        }
      });

      this.setState(prevState => ({Data: [...prevState.Data,...gumtreeDataParsed]}));

    } else {
      const gumtreeDataFiltered = this.state.gumtreeData.data.filter((listing) => {
        if (isNull(listing.title).toLowerCase().includes(this.state.searchTerm)) {
          return true;
        } else if (isNull(listing.description).toLowerCase().includes(this.state.searchTerm)) {
          return true;
        } else {
          return false;
        }
      });
      this.setState(prevState => ({Data: [...prevState.Data,...gumtreeDataFiltered]}));
    }

    if (this.state.facebookData.status === "unresolved") {
      const facebook_url = "https://api.apify.com/v2/datasets/IitkxYE95yydtzFlk/items?clean=true&format=json"
      const facebookResponse = await fetch(facebook_url);
      const facebookData = await facebookResponse.json();
      const facebookDataFiltered = facebookData.filter( listing =>
        listing.title.toLowerCase().includes(searchQuery || listing.description.toLowerCase().includes(searchQuery)));
  
      const facebookDataParsed = facebookDataFiltered.map(
        listing => {
          return {
            title: "" + isNull(listing.title),
            price: "" + facebookPriceParsed(listing.price),
            description: "" + isNull(listing.description),
            image: "" + missingImagesFiltered(listing.image),
            url: "" + isNull(listing.url),
            site: "facebook"
          }
        }
      )

      this.setState({
        facebookData : {
          data: facebookDataParsed,
          status: 'resolved'
        }
      });
      
      this.setState(prevState => ({Data: [...prevState.Data,...facebookDataParsed]}));

    } else {
      const facebookDataFiltered = this.state.facebookData.data.filter((listing) => {
        if (isNull(listing.title).toLowerCase().includes(this.state.searchTerm)) {
          return true;
        } else if (isNull(listing.description).toLowerCase().includes(this.state.searchTerm)) {
          return true;
        } else {
          return false;
        }
      });
      this.setState(prevState => ({Data: [...prevState.Data,...facebookDataFiltered]}));
    }

    const etsyRaw = await fetch(`https://loma-cors.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=${searchQuery}&tags=vintage&limit=200&region=GB&api_key=sh1n3isgj6bax7eotlor7m4s&includes=Images`);
    const etsyJson = await etsyRaw.json();
    const etsyDataResults = etsyJson.results;
    const etsyData = etsyDataResults.map( listing => {
      return {
        title: listing.title,
        price: listing.price,
        description: listing.description,
        image: missingImagesFiltered(listing.Images[0].url_570xN),
        url: listing.url,
        site: "etsy"
      }
    });

    this.setState(prevState => ({Data: [...prevState.Data,...etsyData]}));

    const trashnothingRaw = await fetch(`https://trashnothing.com/api/v1.2/posts/search?search=${searchQuery}&sort_by=relevance&types=offer&sources=trashnothing&per_page=50&page=4&device_pixel_ratio=1&latitude=51.507351&longitude=-0.127758&radius=200000&api_key=yr8sVaHEvbdkdunSFfPoDpqlwEjxIuqB3XhyFzx1`);
    const tnJson = await trashnothingRaw.json();
    const tnResults = tnJson.posts;
    const trashNothingData = tnResults.map( listing => {
      return {
        title: listing.title,
        price: 0,
        description: listing.content,
        image: tnmissingImagesFiltered(listing),
        url: listing.url,
        site: "trashnothing"
      }
    });

    this.setState(prevState => ({Data: [...prevState.Data,...trashNothingData]}));

    function highest( a, b ) {
      if ( Number(a.price) < Number(b.price) ){
        return 1;
      }
      if ( Number(a.price) > Number(b.price) ){
        return -1;
      }
      return 0;
    }

    function lowest( a, b ) {
      if ( Number(a.price) < Number(b.price) ){
        return -1;
      }
      if ( Number(a.price) > Number(b.price) ){
        return 1;
      }
      return 0;
    } 

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }
      this.state.resultsDisplay === "⚡️ Trending ⚡️" ? this.setState(prevState => ({Data: shuffleArray(prevState.Data), loading: false}))
     : this.state.resultsDisplay === "Highest price first ▲" ? this.setState(prevState => ({Data: prevState.Data.sort(highest), loading: false}))
     : this.state.resultsDisplay === "Lowest price first ▼" ? this.setState(prevState => ({Data: prevState.Data.sort(lowest), loading: false}))
     : this.setState(prevState => ({Data: prevState.Data, loading: false}))

  console.timeEnd("complete search")
  }