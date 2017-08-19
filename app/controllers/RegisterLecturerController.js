var nodemailer = require('nodemailer');
var token      = require('../../authorization/XOAuth2');

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

var registerLecturerController = {
    index: function (req, res) {
        res.render('parents/dang-ky-tim-gia-su');
    },

    sendEmailToEducation: function (req, res) {
        var full_name = req.body.full_name;
        var address = req.body.address;
        var phone = req.body.phone;
        var email = req.body.email;
        var subject = req.body.subject;
        var number_student = req.body.number_student;
        var option_class = req.body.option_class;
        var number_of_time = req.body.number_of_time;
        var message = req.body.message;

        var messageInfo = (message == '') ? 'Không có' : message;
        var classes = "";
        if(option_class != null && option_class.length > 0){
            for(var i = 0; i < option_class.length; i++){
                classes += option_class[i];
                if(i < (option_class.length - 1) ){
                    classes += ', ';
                }
            }
        }
        
        var mailOptions = {
            from: full_name + '<' + email + '>',
            to: 'thangpham.it92@gmail.com',
            subject: 'ĐĂNG KÝ TÌM GIA SƯ',
            html: 'Xin chào trung tâm <b>TƯ VẤN DU HỌC ĐẠI HẢI</b>' + 
                '<br>'+
                'Tôi muốn đăng ký tìm gia sư với các thông tin như sau: ' +
                '<br><b>Môn học: </b>' + subject +
                '<br><b>Số lượng học sinh: </b>' + number_student + 
                '<br><b>Giảng dạy lớp: </b>' + classes +
                '<br><b>Buổi dạy: </b>' + number_of_time + ' buổi / tuần' + 
                '<br><b>Yêu cầu thêm: </b>' + messageInfo +
                '<br><b>Trung tâm vui lòng liên hệ với ' + full_name + ' qua số điện thoại ' + phone + '</b>' +
                '<br><b>Địa chỉ: </b>' + address
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.render('modals/dang-ky-tim-gia-su-modal', {
                    flash: {
                        type: 'error',
                        title: 'ĐĂNG KÝ TÌM GIA SƯ THẤT BẠI',
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
                res.render('modals/dang-ky-tim-gia-su-modal', {
                    flash: {
                        type: 'success',
                        title: 'ĐĂNG KÝ TÌM GIA SƯ THÀNH CÔNG',
                        message: 'Cảm ơn bạn đã liên lạc với trung tâm <b>TƯ VẤN DU HỌC ĐẠI HẢI</b>.' + 
                                '<br>' +
                                'Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất!'
                    }
                });
            }
        });
    }
}

module.exports = registerLecturerController;