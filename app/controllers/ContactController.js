var nodemailer = require('nodemailer');
var token      = require('../../authorization/XOAuth2');
var Contact = require('../models/Contact');

// get authorized
var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: token.user,
        pass: token.pass
    },
    tls: {
        rejecUnauthorized: false
    }
});

var contactController = {
    index: function (req, res, next) {
        res.render('contact/lien-he', {
            title: 'Liên Hệ',
            success: req.session.success,
            errors: req.body.errors
        });
        req.session.errors = null;
    },

    sendEmailToEducation: function(req, res, next) {
        // check validator

        var full_name = req.body.full_name;
        var address = req.body.address;
        var email = req.body.email;
        var phone = req.body.phone;
        var message = req.body.message;
        
        var mailOptions = {
            from: full_name + '<' + email + '>',
            to: 'thangpham.it92@gmail.com',
            subject: 'LIÊN HỆ',
            html: 'Xin chào trung tâm <b>TƯ VẤN DU HỌC ĐẠI HẢI</b>' + 
                '<br>'+
                'Trung tâm vui lòng liên hệ với ' + full_name + ' với các thông tin sau: ' +
                '<br><b>Họ tên: </b>' + full_name +
                '<br><b>Đại chỉ: </b>' + address + 
                '<br><b>Email: </b>' + email +
                '<br><b>Phone: </b>' + phone +
                '<br><b>Yêu cầu thêm: </b>' + message
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.render('modals/lien-he-modal', {
                    flash: {
                        type: 'error',
                        title: 'LIÊN HỆ VỚI TRUNG TÂM THẤT BẠI',
                        message: 'Bạn vui lòng liên lạc trực tiếp với trung tâm <b>TƯ VẤN DU HỌC ĐẠI HẢI</b>.' +
                                 '<br>' +
                                 'Liên hệ và ghi danh tại Văn phòng trụ sở chính: ' +
                                 '<br>' +
                                 '<b>18/64A, KDC Đại Hải, Ấp 7, xã Xuân Thới Thượng, huyện Hóc Môn, HCM.</b>' + 
                                 '<br>' +
                                 '<b>Số điện thoại</b>: 0862.50.55.22 hoặc 0914.787.008 (Thầy Nam).' + 
                                 '<br>' +
                                 '<b>Email</b>: tuvanduhocdaihai@gmail.com'
                    }
                });
            } else {
                // save contact into db
                Contact.createContact({
                    full_name: full_name,
                    address: address,
                    phone: phone,
                    email: email,
                    message: message
                }, function(err){
                });
                res.render('modals/lien-he-modal', {
                    flash: {
                        type: 'success',
                        title: 'LIÊN HỆ VỚI TRUNG TÂM THÀNH CÔNG',
                        message: 'Cảm ơn bạn đã liên lạc với trung tâm <b>TƯ VẤN DU HỌC ĐẠI HẢI</b>.' + 
                                '<br>' +
                                'Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất!'
                    }
                });
            }
        });
    }
}

module.exports = contactController;