import{getUserInfo} from './api/userInfo.js'
import{getNewEntryFormdata} from './forms/newEntryForm.js'


document.addEventListener("DOMContentLoaded", () => {
    getUserInfo();
    getNewEntryFormdata();
  });