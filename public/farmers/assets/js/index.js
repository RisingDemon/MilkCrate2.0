import{getUserInfo} from './api/userInfo.js'
import{getFarmerProfile} from './forms/farmerNumber.js'

document.addEventListener("DOMContentLoaded", () => {
    getUserInfo();
    getFarmerProfile();
  });