// src/constants.ts
export const CONSTANT = {
  constText:{
    gotoUser:"User Sayfası",
    gotoPost:"Post Sayfası",
    title:"Hoş Geldiniz!!",
    description:"  Fullstack Project'sine Hoş Geldiniz! User ve Post sayfalarına buradan gidebilir ve Crud işlemlerini bu sayfalarda gerçekleştirebilirsiniz "

  },

  users: {
    title: "Kullanıcılar",
    nameLabel: "İsim",
    nameInputPlaceHolder:"Bir isim Giriniz",
    surnameLabel: "Soy İsim",
    surNameLabelPlaceHolder:"Soy İsim Giriniz",
    emailLabel: "Email",
    emailLabelPlaceHolder:"Email Giriniz",
    addButton: "Ekle",
    updateButton: "Güncelle",
    deleteButton:"Sil",
    totalUsers: "Toplam kullanıcı",
    onlyLettersError: (field: string) => `${field} sadece harf içerebilir`,
  },
  posts: {
    title: "Posts",
    titleLabel: "Başlık",
    titleLabelPlaceHolder:"Başlık Giriniz",
    selectUserLabel: "Kullanıcı Seç",
    user:"Kullanıcı",
    totalPost:"Toplam Post"
  },

  button:{
    add: "Ekle",
    update: "Güncelle",
    delete:"Sil",
  }
};
