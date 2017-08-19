var nodemailer = require('nodemailer');
var token = require('../../authorization/XOAuth2');
var Lecturer = require('../models/Lecturer');

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

var lecturerController = {
    index: function (req, res) {
        Lecturer.findAll(function (err, lecturers) {
            res.render('parents/gia-su-tieu-bieu', {
                lecturers: lecturers
            });
        });
    },

    indexRegisterDoLecturer: function (req, res) {
        res.render('lecturer/dang-ky-lam-gia-su', {
        });
    },

    registerDoLecturer: function (req, res) {
        var full_name = req.body.full_name;
        var address = req.body.address;
        var phone = req.body.phone;
        var email = req.body.email;
        var education_name = req.body.education_name;
        var major_name = req.body.major_name;
        var account_name = req.body.account_name;
        var password = req.body.password;
        var level_degree = req.body.level_degree;
        var teaching_area = req.body.teaching_area;
        var class_name = req.body.class_name;
        var number_of_time = req.body.number_of_time;
        var subject_name = req.body.subject_name;
        var note = req.body.note;

        var teaching_area_str = "";
        if (teaching_area != null && teaching_area.length > 0) {
            for (var i = 0; i < teaching_area.length; i++) {
                teaching_area_str += teaching_area[i];
                if (i < (option_class.length - 1)) {
                    teaching_area_str += ', ';
                }
            }
        }
        var class_name_str = "";
        if (class_name != null && class_name.length > 0) {
            for (var i = 0; i < class_name.length; i++) {
                class_name_str += class_name[i];
                if (i < (class_name.length - 1)) {
                    class_name_str += ', ';
                }
            }
        }

        var mailOptions = {
            from: full_name + '<' + email + '>',
            to: 'thangpham.it92@gmail.com',
            subject: 'LIÊN HỆ',
            html: 'Đăng ký làm gia sư tại trung tâm <b>TƯ VẤN DU HỌC ĐẠI HẢI</b>' +
            '<br>' +
            'Trung tâm vui lòng liên hệ với ' + full_name + ' với các thông tin sau: ' +
            '<br><b>Họ tên: </b>' + full_name +
            '<br><b>Đại chỉ: </b>' + address +
            '<br><b>Email: </b>' + email +
            '<br><b>Phone: </b>' + phone +
            '<br><b>Trường đào tạo: </b>' + education_name +
            '<br><b>Chuyên ngành: </b>' + major_name +
            '<br><b>Lớp dạy: </b>' + class_name_str +
            '<br><b>Môn dạy: </b>' + subject_name +
            '<br><b>Khư vực đăng ký: </b>' + teaching_area_str +
            '<br><b>Yêu cầu thêm: </b>' + note
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
                // save lecturer into db
                // Lecturer.createLecturer({
                //     full_name: full_name,
                //     address: address,
                //     phone: phone,
                //     email: email,
                //     education_name: education_name,
                //     major_name: major_name,
                //     account_name: account_name,
                //     password: password,
                //     level_degree: level_degree,
                //     teaching_area: teaching_area_str,
                //     class_name: class_name_str,
                //     number_of_time: number_of_time,
                //     subject_name: subject_name,
                //     note: note
                // }, function (err) {
                // });
                res.render('modals/lien-he-modal', {
                    flash: {
                        type: 'success',
                        title: 'LIÊN HỆ VỚI TRUNG TÂM THÀNH CÔNG',
                        message: 'Cảm ơn bạn đã đăng ký làm gia sư tại trung tâm <b>TƯ VẤN DU HỌC ĐẠI HẢI</b>.' +
                        '<br>' +
                        'Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất!'
                    }
                });
            }
        });
    },

    processReceiverClass: function(eeq, res) {
        res.render('lecturer/quy-trinh-nhan-lop', {});
    }
};

module.exports = lecturerController;