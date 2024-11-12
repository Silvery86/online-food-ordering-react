import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './New.css';

import new2 from '../assets/images/new2.webp';
import new3 from '../assets/images/new3.jpeg';
import new10 from '../assets/images/new10.jpg';
import new7 from '../assets/images/new7.jpg';
import new8 from '../assets/images/new8.webp';

const mainNews = [
  {
    id: 0,
    title: 'Foodsou: Khám Phá Trải Nghiệm Ẩm Thực Độc Đáo',
    description: 'Nhà hàng Foodsou mang đến trải nghiệm ăn uống độc đáo với thực đơn đa dạng và dịch vụ chăm sóc khách hàng tận tình. Cùng khám phá những món ăn và dịch vụ đặc biệt tại Foodsou!',
    imageUrl: new3,
    date: 'Th 6 01/11/2024',
  },
  {
    id: 5,
    title: 'Foodsou Khuyến Mãi Mới - Giảm Giá 20% Cho Khách Hàng Mới',
    description: 'Khách hàng mới khi đến với Foodsou sẽ được giảm giá 20% cho toàn bộ thực đơn. Nhanh tay đặt chỗ để tận hưởng ưu đãi ngay hôm nay!',
    imageUrl: new2,
    date: 'Th 7 02/11/2024',
  },
];

const relatedNews = [
  {
    id: 1,
    title: 'Ưu Đãi Cuối Tuần - Giảm Giá 15% Toàn Bộ Thực Đơn Tại Foodsou',
    description: 'Tận hưởng các món ăn đặc sắc tại Foodsou với ưu đãi giảm giá đặc biệt vào cuối tuần này. Đừng bỏ lỡ cơ hội thưởng thức món ngon với giá cực hấp dẫn!',
    imageUrl: new10,
    date: 'Th 6 01/11/2024',
  },
  {
    id: 2,
    title: '5 Bí Kíp Để Có Trải Nghiệm Tuyệt Vời Tại Foodsou',
    description: 'Để có một bữa ăn hoàn hảo tại Foodsou, hãy tham khảo những mẹo hay từ việc chọn món đến các dịch vụ đặc biệt.',
    imageUrl: new2,
    date: 'Th 5 31/10/2024',
  },
  {
    id: 3,
    title: 'Dịch Vụ Đặc Biệt Tại Foodsou - Đem Đến Trải Nghiệm Khác Biệt',
    description: 'Foodsou không chỉ nổi bật với món ăn ngon mà còn với các dịch vụ khách hàng đặc biệt như khu vui chơi cho trẻ em và quầy phục vụ tự chọn.',
    imageUrl: new7,
    date: 'Th 4 30/10/2024',
  },
  {
    id: 4,
    title: 'Các Món Ăn Đặc Trưng Tại Foodsou Bạn Không Nên Bỏ Lỡ',
    description: 'Hãy cùng khám phá các món ăn đặc trưng làm nên thương hiệu của Foodsou, từ món khai vị đến các món tráng miệng độc đáo.',
    imageUrl: new8,
    date: 'Th 3 29/10/2024',
  },
];

const News = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main News Section */}
        <div className="col-span-1 md:col-span-2 grid gap-4">
          {mainNews.map((news) => (
            <Card key={news.id} className="mb-4">
              <CardMedia
                component="img"
                height="300"
                image={news.imageUrl}
                alt={news.title}
                style={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" className="font-semibold">{news.title}</Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">{news.date}</Typography>
                <Typography variant="body2" color="textSecondary">{news.description}</Typography>
                <Link to={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
                  <Button color="primary" className="mt-2">Đọc tiếp</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Related News Section */}
        <div className="col-span-1 grid gap-4">
          {relatedNews.map((news) => (
            <Card key={news.id} className="flex flex-row">
              <CardMedia
                component="img"
                image={news.imageUrl}
                alt={news.title}
                style={{
                  width: '900px', // Điều chỉnh kích thước chiều rộng
                  height: '300px', // Điều chỉnh kích thước chiều cao
                  objectFit: 'cover',
                }}
              />
              <CardContent className="w-3/4">
                <Typography variant="body1" className="font-semibold">{news.title}</Typography>
                <Typography variant="body2" color="textSecondary" className="mb-1">{news.date}</Typography>
                <Typography variant="body2" color="textSecondary" className="mb-1">{news.description}</Typography>
                <Link to={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
                  <Button color="primary" size="small" className="mt-2">Đọc tiếp</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
