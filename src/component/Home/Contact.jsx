import React from "react";
import { TextField, Button } from "@mui/material";
import new1 from '../assets/images/new1.jpeg';
import new2 from '../assets/images/new2.webp';
import new3 from '../assets/images/new3.jpeg';
import background_full from '../assets/images/background/background-full.webp'
import { useTheme } from "@emotion/react";


function Contact() {
  const theme=useTheme()
  return (
    <div className="relative">
      {/* Header Section */}
      <section className="text-center py-10">
        <h1 style={{color:theme.palette.primary.main}} className="text-4xl font-bold">Liên Hệ Với Chúng Tôi</h1>
        <p className="mt-4 text-black-400">
          Nếu bạn có câu hỏi, muốn đặt bàn, hoặc chỉ muốn chia sẻ ý kiến của mình, chúng tôi rất sẵn lòng lắng nghe bạn.
        </p>
      </section>

      {/* Contact Form */}
      <section className="flex justify-center py-8">
        <div className="w-full max-w-md">
          <TextField label="Tên" variant="outlined" fullWidth margin="normal"  InputLabelProps={{ style: { color: theme.palette.textColor.main } }} />
          <TextField label="Họ" variant="outlined" fullWidth margin="normal"  InputLabelProps={{ style: { color: theme.palette.textColor.main } }} />
          <TextField label="Email" variant="outlined" fullWidth margin="normal"  InputLabelProps={{ style: { color: theme.palette.textColor.main } }} />
          <TextField
            label="Tin Nhắn"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
           
            InputLabelProps={{ style: { color: theme.palette.textColor.main } }}
          />
          <Button variant="contained" color="success" className="w-full mt-4">
            Gửi
          </Button>
        </div>
      </section>

      {/* Location and Contact Info */}
      <section className="flex flex-col md:flex-row justify-around items-center py-10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-bold">Địa Chỉ</h2>
          <p className="text-black-400">Số 8 Tôn Thất Thuyết, Mỹ Đình, Hà Nội</p>
        </div>
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-bold">Giờ Mở Cửa</h2>
          <p className="text-black-400">09:00 sáng - 11:00 tối</p>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Liên Hệ</h2>
          <p className="text-black-400">66888386</p>
        </div>
      </section>

      {/* Map Section */}
      <section className="flex justify-center py-8 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.2359738427725!2d105.7797218!3d21.0288201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab00954decbf%3A0xdb4ee23b49ad50c8!2sFPT%20Aptech%20H%C3%A0%20N%E1%BB%99i!5e0!3m2!1svi!2s!4v1660317856094!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg"
          title="Bản đồ vị trí"
        ></iframe>
      </section>

      {/* Additional Sections */}
      <section className="py-10 text-center">
        <h2 className="text-3xl font-bold">Chia Sẻ Câu Chuyện Ẩm Thực</h2>
        <p className="text-black-400 max-w-2xl mx-auto">
          Khám phá nguồn cảm hứng đứng sau những món ăn đặc trưng của chúng tôi, gặp gỡ những đầu bếp tài năng định hình mỗi hương vị trong khi chúng tôi chia sẻ mẹo và kỹ thuật nấu ăn.
        </p>
        <div className="flex flex-col md:flex-row justify-around items-stretch mt-8">
          <div className="p-4 w-full md:w-1/3 flex flex-col items-center">
            <img
              src={new1}
              alt="Câu Chuyện Ẩm Thực"
              className="rounded-lg mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-xl font-semibold">Câu Chuyện Ẩm Thực</h3>
            <p className="text-black-400">Khám phá những câu chuyện làm nên sự độc đáo cho mỗi món ăn.</p>
          </div>
          <div className="p-4 w-full md:w-1/3 flex flex-col items-center">
            <img
              src={new2}
              alt="Hương Vị Thế Giới"
              className="rounded-lg mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-xl font-semibold">Hương Vị Thế Giới</h3>
            <p className="text-black-400">Bắt đầu một cuộc phiêu lưu ẩm thực toàn cầu.</p>
          </div>
          <div className="p-4 w-full md:w-1/3 flex flex-col items-center">
            <img
              src={new3}
              alt="Dịch Vụ Tiệc Tùng"
              className="rounded-lg mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-xl font-semibold">Dịch Vụ Tiệc Tùng</h3>
            <p className="text-black-400">Biến sự kiện của bạn thành những trải nghiệm đáng nhớ với dịch vụ tiệc tùng của chúng tôi.</p>
          </div>
        </div>
      </section>
      <div className="home__cover absolute top-0 left-0 right-0 bottom-0 -z-10">
        <img
          src={background_full || "../assets/images/default.jpg"}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>

    </div>
  
  );
}

export default Contact;
