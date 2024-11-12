import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Thêm import Link để dùng React Router

import new1 from '../assets/images/new1.jpeg';
import new2 from '../assets/images/new2.webp';
import new4 from '../assets/images/new4.jpeg';
import new5 from '../assets/images/new5.png';
import new6 from '../assets/images/new6.webp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import cocktail from '../assets/images/cocktail.jpg';
import { useTheme } from '@emotion/react';
const AboutUs = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Kiểm tra vị trí cuộn để hiển thị mũi tên cuộn lên đầu
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  // Hàm cuộn trang lên đầu
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Đăng ký sự kiện cuộn khi component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const theme = useTheme()
  return (
    <Box className="relative">
      {/* Tiêu đề chính */}
      <Box className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/about_header.jpg)' }}>
        <Box className="absolute inset-0"></Box>
        <Typography variant="h2" className="absolute inset-x-0 top-1/2 text-green-500 text-center transform -translate-y-1/2 font-bold">
          Giới Thiệu Về Chúng Tôi
        </Typography>
      </Box>

      <Box className="max-w-7xl mx-auto py-16 px-6">
        {/* Phần giới thiệu */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" className="text-green-500 font-bold mb-4">
              Ẩm Thực Ngon Miệng Tại Food Sou
            </Typography>
            <Typography variant="body1" className="text-black-300 mb-6">
              Chào mừng bạn đến với Food Sou, nơi chúng tôi phục vụ những món ăn chất lượng cao và đáp ứng mọi mong muốn ẩm thực của bạn. Chúng tôi luôn cam kết mang đến cho bạn trải nghiệm ẩm thực tuyệt vời với hương vị đa dạng từ khắp nơi trên thế giới.
            </Typography>
            <Typography variant="body1" className="text-black-300 mb-6">
              Nhà hàng Food Sou ra đời từ niềm đam mê ẩm thực và mong muốn mang đến cho thực khách những trải nghiệm ẩm thực phong phú và đa dạng. Đến với chúng tôi, bạn sẽ được thưởng thức những món ăn được chế biến từ những nguyên liệu tươi ngon nhất, kết hợp với các phương pháp chế biến hiện đại.
            </Typography>

            {/* Nội dung bổ sung */}
            <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
              Tầm Nhìn và Sứ Mệnh
            </Typography>
            <Typography variant="body1" className="text-black-300 mb-6">
              Tầm nhìn của chúng tôi là trở thành điểm đến ẩm thực hàng đầu, nơi mọi khách hàng có thể trải nghiệm sự đa dạng và sáng tạo trong từng món ăn. Chúng tôi tin rằng mỗi bữa ăn không chỉ là một sự kết hợp của nguyên liệu mà còn là một hành trình khám phá hương vị và cảm xúc.
            </Typography>
            <Typography variant="body1" className="text-black-300 mb-6">
              Sứ mệnh của Food Sou là đem đến cho khách hàng những bữa ăn đầy cảm hứng, chất lượng vượt trội và dịch vụ chuyên nghiệp. Chúng tôi cam kết sử dụng nguyên liệu tươi ngon và duy trì tiêu chuẩn chất lượng cao nhất trong mỗi món ăn.
            </Typography>

            <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
              Nguồn Gốc Nguyên Liệu Chất Lượng
            </Typography>
            <Typography variant="body1" className="text-black-300 mb-6">
              Tất cả các nguyên liệu mà chúng tôi sử dụng đều được chọn lọc kỹ càng từ các nhà cung cấp uy tín, đảm bảo an toàn và chất lượng cao. Chúng tôi đặc biệt chú trọng đến việc lựa chọn nguyên liệu địa phương để hỗ trợ nông dân và nhà cung cấp trong khu vực, đồng thời giảm thiểu tác động đến môi trường.
            </Typography>
            <Typography variant="body1" className="text-black-300 mb-6">
              Các món ăn tại Food Sou được chế biến từ nguyên liệu tươi sống, được kiểm tra chất lượng nghiêm ngặt trước khi đưa vào sử dụng. Bạn sẽ cảm nhận được sự tươi mới và hương vị tự nhiên trong từng món ăn mà chúng tôi phục vụ.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src={new1} alt="Quang cảnh nhà hàng" className="w-full h-auto rounded-md shadow-lg" />
          </Grid>
        </Grid>

        {/* Thiết kế hiện đại */}
<Grid container spacing={4} className="mt-10">
  <Grid item xs={12} md={6}>
    <img src={new2} alt="Thiết kế hiện đại" className="w-full h-auto rounded-md shadow-lg" />
  </Grid>
  <Grid item xs={12} md={6}>
    <Typography variant="h4" className="text-green-500 font-bold mb-4">
      Thiết Kế Hiện Đại
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Nhà hàng của chúng tôi có thiết kế hiện đại với không gian ấm cúng và ánh sáng dịu nhẹ. Mỗi khu vực trong nhà hàng đều được chăm chút tỉ mỉ để mang đến một không gian thoải mái, nơi bạn có thể tận hưởng bữa ăn một cách trọn vẹn.
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Chúng tôi chú trọng đến việc tạo ra một không gian thân thiện và tinh tế, với sự kết hợp hoàn hảo giữa sự sang trọng và sự thoải mái. Mỗi góc nhỏ trong nhà hàng đều được thiết kế để mang đến cho bạn cảm giác thư giãn và dễ chịu.
    </Typography>

    {/* Nội dung bổ sung */}
    <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
      Tầm Nhìn và Sứ Mệnh
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Food Sou không chỉ mang đến các món ăn ngon miệng mà còn đề cao sứ mệnh cung cấp dịch vụ và không gian đẳng cấp, giúp khách hàng có những trải nghiệm ẩm thực thật sự khác biệt. Chúng tôi tin rằng mỗi bữa ăn là một cơ hội để kết nối và tạo nên những kỷ niệm đáng nhớ.
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Với sự sáng tạo và tâm huyết của đội ngũ đầu bếp, chúng tôi mong muốn mang đến những trải nghiệm ẩm thực phong phú, đa dạng, không chỉ về hương vị mà còn là về cảm xúc và không gian. Mỗi lần đến với Food Sou, bạn sẽ được tận hưởng sự kết hợp hoàn hảo giữa ẩm thực và nghệ thuật.
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Chúng tôi cam kết không ngừng nỗ lực cải tiến và đổi mới để mang đến cho khách hàng những dịch vụ tốt nhất. Với phương châm "Tinh tế trong từng chi tiết", mỗi món ăn, mỗi không gian và mỗi dịch vụ đều được chúng tôi chăm chút để tạo ra một trải nghiệm ẩm thực đẳng cấp và khác biệt.
    </Typography>
  </Grid>
</Grid>


       {/* Khu vực cocktail */}
<Box className="mt-16 text-center">
  <Typography variant="h4" className="text-green-500 font-bold mb-4">
    Khu Vực Cocktail
  </Typography>
  <Typography variant="body1" className="text-black-300 max-w-3xl mx-auto mb-8">
    Khu vực quầy bar tại Food Sou là nơi lý tưởng để thư giãn với bạn bè và thưởng thức những ly cocktail độc đáo. Được chế biến từ những nguyên liệu tươi mới và nguyên liệu đặc trưng, mỗi ly cocktail tại đây đều mang đến sự mới mẻ và sự tinh tế cho thực khách.
  </Typography>
  <img src={cocktail} alt="Khu vực cocktail" className="w-full h-auto rounded-md shadow-lg mx-auto" />

  {/* Nội dung bổ sung */}
  <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
    Nguồn Gốc Nguyên Liệu Cocktail
  </Typography>
  <Typography variant="body1" className="text-black-300 mb-6">
    Chúng tôi tự hào về nguồn gốc và chất lượng của các nguyên liệu được sử dụng để pha chế cocktail. Mỗi thành phần đều được chọn lọc cẩn thận để đảm bảo sự kết hợp hoàn hảo, mang lại hương vị tinh tế cho từng ly cocktail.
  </Typography>
</Box>

{/* Buffet ngon miệng */}
<Grid container spacing={4} className="mt-10">
  <Grid item xs={12} md={6}>
    <Typography variant="h4" className="text-green-500 font-bold mb-4">
      Buffet Ngon Miệng
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Food Sou mang đến trải nghiệm buffet thú vị với hương vị từ khắp nơi trên thế giới. Chúng tôi luôn tìm kiếm những món ăn mới mẻ để làm phong phú thêm thực đơn buffet, nhằm mang đến cho bạn những trải nghiệm ẩm thực tuyệt vời.
    </Typography>

    {/* Nội dung bổ sung */}
    <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
      Tầm Nhìn và Sứ Mệnh
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Đặt khách hàng lên hàng đầu, chúng tôi cam kết cung cấp trải nghiệm buffet không chỉ về chất lượng món ăn mà còn về phong cách phục vụ tận tâm và chuyên nghiệp. Mỗi bữa tiệc buffet tại Food Sou đều là một sự kiện đáng nhớ.
    </Typography>

    {/* Nội dung bổ sung thêm ngay dưới Tầm Nhìn và Sứ Mệnh */}
    <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
      Sự Tận Tâm Trong Dịch Vụ
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu và cam kết mang đến dịch vụ xuất sắc. Mỗi bữa tiệc buffet tại Food Sou không chỉ là cơ hội để thưởng thức những món ăn ngon, mà còn là một trải nghiệm ẩm thực trọn vẹn với sự chăm sóc chu đáo từ đội ngũ nhân viên của chúng tôi. Từ việc chuẩn bị món ăn đến cách phục vụ, tất cả đều được chăm chút tỉ mỉ để đảm bảo bạn sẽ có một bữa ăn hoàn hảo.
    </Typography>

    {/* Nội dung bổ sung thêm: Đổi mới thực đơn */}
    <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
      Đổi Mới Thực Đơn Liên Tục
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Mỗi lần đến Food Sou, bạn sẽ được trải nghiệm một thực đơn mới mẻ với những món ăn sáng tạo, kết hợp tinh tế giữa các nền ẩm thực. Chúng tôi luôn tìm kiếm những món ăn mới, lạ và áp dụng các phương pháp nấu ăn sáng tạo để mang đến những trải nghiệm không giống bất kỳ nơi nào khác. Đặc biệt, các món buffet tại đây luôn được thay đổi thường xuyên, giúp bạn không bao giờ cảm thấy nhàm chán mỗi khi quay lại.
    </Typography>

    {/* Nội dung bổ sung thêm: Phong cách phục vụ sáng tạo */}
    <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
      Phong Cách Phục Vụ Sáng Tạo
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Tại Food Sou, chúng tôi không chỉ chú trọng đến chất lượng món ăn mà còn luôn sáng tạo trong phong cách phục vụ. Đội ngũ nhân viên của chúng tôi không chỉ là người phục vụ, mà là những người bạn đồng hành cùng bạn trong suốt hành trình thưởng thức bữa ăn. Chúng tôi luôn cố gắng mang đến những trải nghiệm phục vụ độc đáo, với sự chuyên nghiệp và thái độ thân thiện, giúp bạn cảm thấy thoải mái và thư giãn trong suốt thời gian ở đây.
    </Typography>

    {/* Tiện ích khác */}
    <Typography variant="h4" className="text-green-500 font-bold mb-4 mt-8">
      Tiện Ích và Dịch Vụ Khác
    </Typography>
    <Typography variant="body1" className="text-black-300 mb-6">
      Để đảm bảo khách hàng có được một trải nghiệm hoàn hảo, Food Sou cung cấp đầy đủ các tiện ích như khu vực riêng tư cho những buổi họp nhóm hoặc tiệc riêng, hệ thống âm thanh ánh sáng hiện đại, cùng với không gian ngoài trời thoáng đãng, lý tưởng cho những buổi tối thư giãn. Chúng tôi luôn cố gắng tạo ra một không gian thoải mái, phù hợp với mọi nhu cầu của khách hàng.
    </Typography>
  </Grid>
  <Grid item xs={12} md={6} className="grid grid-cols-2 gap-4">
    <img src={new4} alt="Món ăn buffet 1" className="w-full h-full object-cover rounded-md shadow-lg" />
    <img src={new5} alt="Món ăn buffet 2" className="w-full h-full object-cover rounded-md shadow-lg" />
    <img src={new6} alt="Món ăn buffet 3" className="w-full h-full object-cover rounded-md shadow-lg" />
    <img src={new1} alt="Món ăn buffet 4" className="w-full h-full object-cover rounded-md shadow-lg" />
  </Grid>
</Grid>


        {/* Đăng ký nhận tin */}
        <Box className="mt-16 bg-green-500 py-8 text-center text-black rounded-md">
          <Typography variant="h5" className="font-semibold mb-4">
            Cập nhật những tin tức và sự kiện mới nhất
          </Typography>
          <Typography variant="body2" className="mb-6">
            Nhập email của bạn và đăng ký nhận bản tin của chúng tôi để không bỏ lỡ bất kỳ chương trình khuyến mãi hay sự kiện đặc biệt nào!
          </Typography>
          <form>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={8} md={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                <TextField
                  variant="outlined"
                  placeholder="Email của bạn"
                  type="email"
                  fullWidth
                  className="mb-4 px-4 py-2 rounded-md"
                  InputProps={{
                    style: {
                      backgroundColor: 'white', // Màu nền trắng
                      color: 'black',            // Màu chữ đen
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      color: 'black', // Màu chữ của label đen
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2} sx={{ display: 'flex', alignItems: 'stretch' }}>
                <Button variant="contained" color="primary" fullWidth>
                  Đăng Ký
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>        
    </Box>
  );
};

export default AboutUs;
