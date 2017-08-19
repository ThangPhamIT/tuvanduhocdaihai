var express         = require('express');
// create our route object
var route = express.Router();
//export our router
module.exports = route;

// controllers
var controller = require('./controllers/index');

// route
route.get('/', controller.home.index);

route.get('/lop-moi', controller.newClass.index);
route.get('/lop-moi/:id', controller.newClass.detailClass);

route.get('/lien-he', controller.contact.index);
route.post('/lien-he', controller.contact.sendEmailToEducation)

route.get('/dang-ky-lam-gia-su', controller.lecturer.indexRegisterDoLecturer);
route.post('/dang-ky-lam-gia-su', controller.lecturer.registerDoLecturer);
route.get('/quy-trinh-nhan-lop', controller.lecturer.processReceiverClass);

route.get('/dang-ky-tim-gia-su', controller.registerLecturer.index);
route.post('/dang-ky-tim-gia-su', controller.registerLecturer.sendEmailToEducation);
route.get('/hoc-phi-tham-khao', controller.tuitionPrice.index);
route.get('/phu-huynh-can-biet', controller.parentKnow.index);
route.get('/dich-vu-gia-su', controller.serviceLecturer.index);
route.get('/gia-su-tieu-bieu', controller.lecturer.index);

route.get('/tuyen-dung', controller.recruitment.index);