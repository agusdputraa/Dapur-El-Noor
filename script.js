// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrkubOseHCU5XB6keqNnG8scFckPJaXJY",
    authDomain: "dapur-el-noor.firebaseapp.com",
    projectId: "dapur-el-noor",
    storageBucket: "dapur-el-noor.appspot.com",
    messagingSenderId: "442614318414",
    appId: "1:442614318414:web:4ca2ce54a46dfc7a994a1f",
    measurementId: "G-EB04HYJYM6"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    
    db.collection('menus').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const menuItem = doc.data();
        menuContainer.innerHTML += `
          <div class="menu-item">
            <img src="${menuItem.imageURL}" alt="${menuItem.name}">
            <h3>${menuItem.name}</h3>
            <p>${menuItem.description}</p>
            <p>Rp${menuItem.price.toLocaleString()}</p>
            <button onclick="showPopup('${doc.id}')">Lihat Detail</button>
          </div>
        `;
      });
    });
  });
  
  function showPopup(docId) {
    db.collection('menus').doc(docId).get().then((doc) => {
      const menuItem = doc.data();
      document.getElementById('popup-image').src = menuItem.imageURL;
      document.getElementById('popup-name').innerText = menuItem.name;
      document.getElementById('popup-description').innerText = menuItem.description;
      document.getElementById('popup-price').innerText = `Rp${menuItem.price.toLocaleString()}`;
      document.getElementById('menu-popup').style.display = 'block';
    });
  }
  
  function closePopup() {
    document.getElementById('menu-popup').style.display = 'none';
  }
  