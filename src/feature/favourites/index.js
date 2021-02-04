import firebase from 'firebase'

export function getFavourites() {
  return new Promise((resolve) => {
    const uuid = firebase.auth().currentUser.uid
    console.log(uuid)
    firebase
      .firestore()
      .collection('favourites')
      .where('uuid', '==', uuid)
      .get()
      .then((querySnapshot) => {
        // resolve({ ok: true, data: querySnapshot.docs.map((doc) => doc.data()) })
        var array = []
        querySnapshot.forEach((doc) => {
          array.push(doc.data())
        })

        resolve({ ok: true, data: array })
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
      })
  })
}

export function addFavourite(listing) {}
