import React from 'react';
import { useParams } from 'react-router-dom'; // Để lấy ID từ URL
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Để quay lại trang danh sách tin tức
//import "./NewsDetail.css"; // Tệp CSS riêng cho trang chi tiết tin


import new3 from '../assets/images/new3.jpeg';

import anhnew1 from '../assets/images/anhnew1.jpg'
import anhnew2 from '../assets/images/anhnew2.webp'
import anhnew3 from '../assets/images/anhnew3.jpg'
import anhnew4 from '../assets/images/anhnew4.jpg'
import anhnew5 from '../assets/images/anhnew5.jpg'

const newsData = [
  {
    id: 0,
    title: "Foodsou: Khám Phá Trải Nghiệm Ẩm Thực Độc Đáo",
    description: "Khám phá những trải nghiệm ẩm thực độc đáo tại Foodsou, nơi hội tụ những món ăn tinh tế và những trải nghiệm ẩm thực đẳng cấp.",
    imageUrl: new3,
    date: "Th 6 01/11/2024",
    content: [
      <h1>I. Khám Phá Trải Nghiệm Ẩm Thực Độc Đáo Tại Foodsou</h1>,
      <p>Ẩm thực không chỉ là một phần của cuộc sống, mà còn là một hành trình khám phá văn hóa, sự sáng tạo và những kết nối tình cảm. Tại Foodsou, mỗi bữa ăn không chỉ là món ăn, mà còn là một câu chuyện về sự tinh tế, một sự giao thoa giữa các nền văn hóa, và một trải nghiệm tuyệt vời cho tất cả các giác quan. Chúng tôi tự hào mang đến cho bạn không chỉ một bữa ăn, mà là một hành trình ẩm thực đầy cảm hứng, nơi bạn có thể khám phá những hương vị mới lạ từ khắp nơi trên thế giới.</p>,
      
      <p>Chào mừng bạn đến với **Foodsou**, nơi bạn có thể khám phá các món ăn độc đáo, được chế biến từ những nguyên liệu tươi ngon và chất lượng nhất. Đến với chúng tôi, bạn sẽ không chỉ thưởng thức những món ăn đậm đà hương vị, mà còn được trải nghiệm một không gian sang trọng, ấm cúng và đầy tính nghệ thuật. Mỗi món ăn tại Foodsou đều được chế biến từ tâm huyết và sự sáng tạo của các đầu bếp tài năng, mang lại cho bạn những hương vị khó quên.</p>,
  
      <p>**Foodsou** không chỉ là một nhà hàng, mà còn là một nơi để bạn trải nghiệm những điều mới mẻ về ẩm thực. Chúng tôi không ngừng sáng tạo và đổi mới thực đơn để mỗi lần ghé thăm, bạn lại được khám phá những món ăn độc đáo. Từ những món ăn đường phố nổi tiếng của các quốc gia, đến những món ăn cao cấp từ các nền ẩm thực tinh tế, mỗi món ăn tại Foodsou đều mang một câu chuyện riêng, phản ánh sự phong phú và đa dạng của văn hóa ẩm thực thế giới.</p>,
  
      <h0>II. Thực Đơn Độc Đáo: Món Ăn Từ Khắp Nơi Trên Thế Giới</h0>,
      
      <p>Thực đơn tại **Foodsou** là sự kết hợp hoàn hảo giữa các món ăn truyền thống và những món ăn sáng tạo, pha trộn giữa những hương vị truyền thống và sự sáng tạo không ngừng. Mỗi món ăn không chỉ là sự hòa quyện giữa nguyên liệu mà còn là sự giao thoa của các nền văn hóa ẩm thực. Từ món ăn Á Đông đậm đà hương vị, đến những món ăn Âu nhẹ nhàng tinh tế, bạn sẽ tìm thấy những món ăn phù hợp với khẩu vị của mình.</p>,
  
      <p>Chúng tôi tự hào có thể mang đến cho bạn những món ăn đặc biệt, được chế biến từ những nguyên liệu tươi ngon, chất lượng và được tuyển chọn kỹ lưỡng. Những món ăn tại Foodsou không chỉ làm hài lòng bạn bởi hương vị tuyệt vời mà còn vì sự cầu kỳ trong cách chế biến, sự kết hợp sáng tạo giữa các nguyên liệu và cách trình bày đẹp mắt. Dưới đây là một vài món ăn đặc trưng mà bạn không thể bỏ qua khi đến Foodsou:</p>,
  
      <ul><li><strong>Món Súp Trái Cây Tươi Mát:</strong> Món súp này kết hợp trái cây tươi ngon, được chế biến công phu để mang lại sự kết hợp độc đáo giữa ngọt ngào, thanh mát và tinh tế. Đây là món ăn lý tưởng để bắt đầu bữa ăn của bạn.</li>
      <li><strong>Thịt Nướng Cao Cấp:</strong> Những miếng thịt nướng vàng ươm, mềm mại và đầy hương vị, được chế biến từ các nguyên liệu nhập khẩu từ các quốc gia nổi tiếng về ẩm thực. Món ăn này chắc chắn sẽ làm bạn hài lòng bởi độ tươi ngon và sự hoàn hảo trong cách chế biến.</li>
      <li><strong>Món Ăn Sáng Tạo: Sushi Fusion:</strong> Một món ăn kết hợp giữa sushi truyền thống Nhật Bản và các nguyên liệu phương Tây, tạo ra một sự kết hợp mới mẻ, vừa quen thuộc nhưng cũng đầy sáng tạo.</li></ul>,
  
      <p>Mỗi món ăn tại **Foodsou** đều có một câu chuyện riêng, và chúng tôi rất tự hào khi có thể chia sẻ những câu chuyện đó với bạn. Những món ăn này không chỉ thể hiện sự sáng tạo của các đầu bếp mà còn là kết quả của sự hợp tác giữa những người đam mê ẩm thực từ nhiều nền văn hóa khác nhau. Chính vì vậy, khi thưởng thức các món ăn tại đây, bạn sẽ cảm nhận được sự hòa quyện của hương vị và sự tôn trọng đối với mỗi nền văn hóa ẩm thực.</p>,
  
      <h1>III. Không Gian và Dịch Vụ: Trải Nghiệm Toàn Diện</h1>,
      
      <p>Không gian tại **Foodsou** được thiết kế để tạo ra một bầu không khí ấm cúng, sang trọng và thư giãn. Chúng tôi hiểu rằng, một bữa ăn không chỉ là về hương vị, mà còn là về không gian và cảm giác mà bạn có được khi thưởng thức món ăn. Đó là lý do tại sao chúng tôi chú trọng vào việc tạo ra một không gian đẹp mắt và thoải mái cho mọi khách hàng.</p>,
  
      <p>Không gian của Foodsou được chia thành nhiều khu vực khác nhau, từ khu vực dành cho những bữa tiệc lớn, đến những góc riêng tư dành cho những buổi tối lãng mạn hay những cuộc họp nhóm thân mật. Mỗi khu vực đều được trang trí với những chi tiết tinh tế, tạo ra một bầu không khí sang trọng nhưng cũng rất gần gũi. Các vật dụng trang trí tại Foodsou đều được lựa chọn kỹ lưỡng, từ những chiếc đèn trang trí ấm áp, đến các bức tranh nghệ thuật treo trên tường, tất cả đều góp phần tạo nên một không gian hoàn hảo cho mỗi bữa ăn.</p>,
  
      <p>Đội ngũ nhân viên của **Foodsou** luôn sẵn sàng phục vụ bạn với sự chuyên nghiệp và thân thiện. Chúng tôi luôn cam kết mang đến cho khách hàng dịch vụ tận tâm, chu đáo, và sẵn sàng đáp ứng mọi yêu cầu của bạn. Mỗi nhân viên đều được đào tạo bài bản, từ kỹ năng phục vụ đến kiến thức về ẩm thực, giúp bạn có thể tận hưởng bữa ăn một cách trọn vẹn nhất. Chúng tôi hiểu rằng dịch vụ là một phần quan trọng trong trải nghiệm ẩm thực, và đó là lý do chúng tôi luôn nỗ lực không ngừng để mang đến dịch vụ hoàn hảo cho khách hàng.</p>,
    ]
},
{
  id: 1,
  title: "Foodsou: Ưu Đãi Cuối Tuần - Giảm Giá 15% Toàn Bộ Thực Đơn",
  description: "Nhanh tay đến Foodsou và nhận ưu đãi 15% giảm giá toàn bộ thực đơn vào cuối tuần này. Khám phá ngay những món ăn đặc sắc từ khắp nơi trên thế giới.",
  imageUrl: anhnew1,
  date: "Th 6 01/11/2024",
  content: [
    <h1>Ưu Đãi Cuối Tuần - Giảm Giá 15% Toàn Bộ Thực Đơn Tại Foodsou</h1>,
    <p>Cuối tuần này, Foodsou mang đến cho bạn một ưu đãi không thể bỏ lỡ! Tất cả thực đơn tại nhà hàng đều được giảm giá 15%, giúp bạn có cơ hội thưởng thức những món ăn đặc sắc với mức giá ưu đãi hấp dẫn.</p>,
    
    <p>Đây là dịp tuyệt vời để bạn khám phá các món ăn độc đáo từ khắp nơi trên thế giới, từ món ăn Á Đông đậm đà cho đến các món ăn phương Tây tinh tế, tất cả đều có mặt trong thực đơn của chúng tôi. Hãy để Foodsou đồng hành cùng bạn trong những buổi tiệc gia đình, hẹn hò hay gặp gỡ bạn bè vào dịp cuối tuần này!</p>,

    <p>**Foodsou** luôn cam kết mang đến cho khách hàng những trải nghiệm ẩm thực tuyệt vời, từ hương vị đến không gian sang trọng. Đội ngũ đầu bếp tài năng của chúng tôi không ngừng sáng tạo, mang đến những món ăn không chỉ ngon mà còn tinh tế và đầy cảm hứng.</p>,

    <h0>Thực Đơn Đặc Sắc Với Ưu Đãi Giảm Giá 15%</h0>,
    
    <p>Thực đơn tại **Foodsou** là sự kết hợp hoàn hảo giữa các món ăn truyền thống và sáng tạo, giúp bạn khám phá hương vị ẩm thực độc đáo từ khắp nơi trên thế giới. Bạn có thể thưởng thức các món ăn nổi bật như:</p>,

    <ul>
      <li><strong>Súp Trái Cây Tươi Mát:</strong> Một món súp kết hợp trái cây tươi ngon, mang đến sự kết hợp hoàn hảo giữa ngọt ngào, thanh mát và tinh tế.</li>
      <li><strong>Thịt Nướng Cao Cấp:</strong> Những miếng thịt nướng thơm lừng, mềm mại, được chế biến từ nguyên liệu nhập khẩu cao cấp.</li>
      <li><strong>Sushi Fusion:</strong> Sự kết hợp giữa sushi truyền thống Nhật Bản và các nguyên liệu phương Tây, tạo nên một món ăn sáng tạo và độc đáo.</li>
    </ul>,

    <p>Chúng tôi luôn tìm kiếm những nguyên liệu tươi ngon và chất lượng nhất để mang đến cho bạn những bữa ăn không chỉ ngon miệng mà còn đẹp mắt. Mỗi món ăn đều là một tác phẩm nghệ thuật, được chế biến kỹ lưỡng và trình bày tinh tế.</p>,

    <h1>Không Gian và Dịch Vụ Tuyệt Vời Tại Foodsou</h1>,
    
    <p>Không gian tại **Foodsou** luôn được chăm chút để mang đến sự thoải mái và sang trọng cho mỗi khách hàng. Từ những buổi tiệc lớn đến các bữa ăn lãng mạn, chúng tôi đều có không gian phù hợp để đáp ứng mọi nhu cầu của bạn.</p>,

    <p>Đội ngũ nhân viên chuyên nghiệp, thân thiện của chúng tôi luôn sẵn sàng phục vụ bạn, đảm bảo bạn có những trải nghiệm ẩm thực tuyệt vời và trọn vẹn nhất. Chúng tôi cam kết đem lại dịch vụ chu đáo và chất lượng hàng đầu.</p>,

    <p>Đừng bỏ lỡ cơ hội nhận ưu đãi giảm giá 15% vào cuối tuần này tại **Foodsou**! Hãy đến và thưởng thức những món ăn tuyệt vời với mức giá cực kỳ hấp dẫn!</p>,
  ]
},

  
{
  id: 2,
  title: "Foodsou: 5 Bí Kíp Để Có Trải Nghiệm Tuyệt Vời Tại Foodsou",
  description: "Khám phá 5 bí kíp giúp bạn có một trải nghiệm tuyệt vời tại Foodsou, nơi mà hương vị tuyệt hảo, không gian sang trọng và dịch vụ tận tâm tạo nên những kỷ niệm khó quên.",
  imageUrl: anhnew2,
  date: "Th 6 01/11/2024",
  content: [
    <h1>5 Bí Kíp Để Có Trải Nghiệm Tuyệt Vời Tại Foodsou</h1>,
    <p>Foodsou không chỉ là nơi bạn đến để thưởng thức món ăn, mà còn là nơi để tận hưởng những trải nghiệm ẩm thực đẳng cấp. Để giúp bạn có một bữa ăn tuyệt vời tại đây, chúng tôi chia sẻ 5 bí kíp giúp bạn tối đa hóa trải nghiệm của mình khi đến với Foodsou.</p>,

    <h2>1. Chọn Thời Gian Phù Hợp</h2>,
    <p>Để có một trải nghiệm tuyệt vời tại Foodsou, hãy lựa chọn thời gian đến nhà hàng hợp lý. Nếu bạn muốn có không gian yên tĩnh, thư giãn, hãy đến vào những giờ ít khách hoặc buổi chiều cuối tuần. Nếu bạn thích không khí nhộn nhịp, vui vẻ, thì những giờ cao điểm như buổi tối cuối tuần chính là lựa chọn hoàn hảo. Dù bạn đến vào thời gian nào, Foodsou đều cam kết mang đến cho bạn trải nghiệm tuyệt vời nhất.</p>,

    <h2>2. Thưởng Thức Món Ăn Đặc Sắc</h2>,
    <p>Mỗi món ăn tại **Foodsou** đều là một tác phẩm nghệ thuật, được chế biến từ nguyên liệu tươi ngon và cao cấp. Để có trải nghiệm tuyệt vời nhất, đừng bỏ lỡ các món ăn đặc trưng như súp trái cây tươi mát, thịt nướng cao cấp và sushi fusion. Những món ăn này không chỉ hấp dẫn về hương vị mà còn đẹp mắt trong cách trình bày.</p>,

    <h2>3. Kết Hợp Đồ Uống Phù Hợp</h2>,
    <p>Với mỗi món ăn tại Foodsou, việc lựa chọn một đồ uống phù hợp là điều không thể thiếu. Đội ngũ bartenders của chúng tôi luôn sẵn sàng tư vấn cho bạn những loại rượu vang, cocktail hoặc đồ uống không cồn hoàn hảo để kết hợp với từng món ăn, giúp bạn có một trải nghiệm ẩm thực trọn vẹn và phong phú.</p>,

    <h2>4. Thưởng Thức Trong Không Gian Sang Trọng</h2>,
    <p>Không gian tại Foodsou được thiết kế tỉ mỉ để mang đến một bầu không khí sang trọng, ấm cúng và tinh tế. Hãy tận dụng không gian của chúng tôi để tạo ra những kỷ niệm đẹp bên gia đình, bạn bè hoặc đối tác. Dù là một buổi tiệc lớn hay bữa ăn riêng tư, bạn chắc chắn sẽ cảm nhận được sự thư giãn và dễ chịu khi thưởng thức món ăn tại đây.</p>,

    <h2>5. Tận Hưởng Dịch Vụ Chuyên Nghiệp</h2>,
    <p>Đội ngũ nhân viên tại **Foodsou** luôn sẵn sàng phục vụ bạn với sự chuyên nghiệp và tận tâm. Họ không chỉ có kỹ năng phục vụ xuất sắc mà còn am hiểu về ẩm thực, giúp bạn lựa chọn món ăn và đồ uống phù hợp. Chúng tôi luôn nỗ lực mang đến một trải nghiệm dịch vụ tuyệt vời, giúp bạn cảm thấy thoải mái và hài lòng nhất khi đến với Foodsou.</p>,

    <p>Hãy áp dụng những bí kíp này khi đến Foodsou và tận hưởng một trải nghiệm ẩm thực đỉnh cao. Chúng tôi cam kết mang đến cho bạn không chỉ là những món ăn tuyệt vời mà còn là những khoảnh khắc khó quên bên những người thân yêu.</p>,

  ]
},

{
  id: 3,
  title: "Foodsou: Dịch Vụ Đặc Biệt - Đem Đến Trải Nghiệm Khác Biệt",
  description: "Khám phá dịch vụ đặc biệt tại Foodsou, nơi mang đến những trải nghiệm ẩm thực độc đáo, từ không gian sang trọng đến phục vụ tận tình, giúp bạn tận hưởng mỗi bữa ăn theo cách hoàn hảo nhất.",
  imageUrl: anhnew3,
  date: "Th 6 01/11/2024",
  content: [
    <h1>Dịch Vụ Đặc Biệt Tại Foodsou - Đem Đến Trải Nghiệm Khác Biệt</h1>,
    <p>Không chỉ là nơi để thưởng thức những món ăn tuyệt vời, **Foodsou** còn mang đến cho bạn một dịch vụ đặc biệt, giúp mỗi trải nghiệm ẩm thực trở nên hoàn hảo và khác biệt. Chúng tôi hiểu rằng, một bữa ăn không chỉ phụ thuộc vào hương vị mà còn là một hành trình trải nghiệm toàn diện, từ không gian, phục vụ cho đến sự tinh tế trong từng chi tiết.</p>,

    <h2>1. Dịch Vụ Tận Tâm, Chuyên Nghiệp</h2>,
    <p>Tại **Foodsou**, chúng tôi đặt sự hài lòng của khách hàng lên hàng đầu. Đội ngũ nhân viên của chúng tôi được đào tạo bài bản, không chỉ am hiểu về ẩm thực mà còn luôn sẵn sàng hỗ trợ và đáp ứng mọi yêu cầu của bạn. Dù là lần đầu tiên hay những lần tiếp theo, bạn sẽ luôn cảm nhận được sự thân thiện, chuyên nghiệp và nhiệt tình từ đội ngũ nhân viên tại đây.</p>,

    <h2>2. Phục Vụ Riêng Tư, Chuyên Biệt</h2>,
    <p>Chúng tôi hiểu rằng mỗi khách hàng đều có những yêu cầu và sở thích riêng biệt. Đó là lý do tại **Foodsou**, bạn có thể yêu cầu phục vụ riêng tư cho những dịp đặc biệt, từ một buổi tiệc gia đình ấm cúng đến những bữa ăn lãng mạn. Hãy để chúng tôi tạo ra một không gian và trải nghiệm riêng biệt, giúp bạn cảm nhận sự khác biệt trong từng khoảnh khắc.</p>,

    <h2>3. Thực Đơn Sáng Tạo, Độc Đáo</h2>,
    <p>Thực đơn tại **Foodsou** là sự kết hợp hoàn hảo giữa các món ăn truyền thống và những món ăn sáng tạo, pha trộn hương vị từ các nền văn hóa ẩm thực khác nhau. Chúng tôi luôn cập nhật những xu hướng ẩm thực mới nhất, đồng thời duy trì những món ăn mang đậm hương vị truyền thống. Mỗi món ăn tại đây đều là một trải nghiệm ẩm thực độc đáo, giúp bạn khám phá những hương vị chưa từng có.</p>,

    <h2>4. Không Gian Sang Trọng và Thoải Mái</h2>,
    <p>Không gian tại **Foodsou** được thiết kế để mang đến cho bạn sự thoải mái tuyệt đối. Mỗi khu vực của nhà hàng đều được trang trí với phong cách sang trọng, tinh tế, tạo ra một bầu không khí dễ chịu, giúp bạn thư giãn và tận hưởng bữa ăn trong không gian đẹp mắt. Dù bạn đang tìm kiếm một không gian cho buổi tiệc lớn hay một góc riêng tư cho buổi tối lãng mạn, chúng tôi đều có thể đáp ứng mọi nhu cầu của bạn.</p>,

    <h2>5. Đảm Bảo Chất Lượng và An Toàn</h2>,
    <p>Với **Foodsou**, sự an toàn và chất lượng luôn là ưu tiên hàng đầu. Chúng tôi luôn chọn lọc nguyên liệu tươi ngon và an toàn nhất để chế biến món ăn, đảm bảo bạn sẽ không chỉ thưởng thức những món ăn ngon mà còn an tâm về chất lượng thực phẩm. Đồng thời, chúng tôi áp dụng các biện pháp nghiêm ngặt về vệ sinh và an toàn thực phẩm, để mỗi bữa ăn tại **Foodsou** đều là một trải nghiệm tuyệt vời và đáng tin cậy.</p>,

    <p>Tại **Foodsou**, mỗi dịch vụ đều được thiết kế để mang lại sự khác biệt. Chúng tôi không chỉ cung cấp một bữa ăn, mà là một hành trình trải nghiệm ẩm thực trọn vẹn và đầy cảm hứng. Hãy đến và tận hưởng dịch vụ đặc biệt của chúng tôi, nơi mọi yêu cầu của bạn sẽ được đáp ứng một cách hoàn hảo.</p>,

  ]
},

{
  id: 4,
  title: "Foodsou: Các Món Ăn Đặc Trưng Bạn Không Nên Bỏ Lỡ",
  description: "Khám phá các món ăn đặc trưng tại Foodsou, nơi mà mỗi món ăn đều là một tác phẩm nghệ thuật, mang đậm hương vị đặc sắc và sự sáng tạo từ các nền ẩm thực khác nhau.",
  imageUrl: anhnew4,
  date: "Th 6 01/11/2024",
  content: [
    <h1>Các Món Ăn Đặc Trưng Tại Foodsou Bạn Không Nên Bỏ Lỡ</h1>,
    <p>Tại **Foodsou**, chúng tôi không chỉ mang đến những món ăn ngon mà còn là một hành trình khám phá những hương vị độc đáo từ khắp nơi trên thế giới. Với đội ngũ đầu bếp tài năng và nguyên liệu tươi ngon, chúng tôi tự hào giới thiệu những món ăn đặc trưng mà bạn không thể bỏ lỡ khi đến đây.</p>,

    <h2>1. Súp Trái Cây Tươi Mát</h2>,
    <p>Được chế biến từ những loại trái cây tươi ngon nhất, món **Súp Trái Cây Tươi Mát** tại Foodsou mang đến sự kết hợp tuyệt vời giữa ngọt ngào, thanh mát và tinh tế. Đây là món khai vị lý tưởng, vừa giúp bạn kích thích vị giác vừa làm dịu mát cơ thể. Với sự pha trộn hoàn hảo giữa các loại trái cây, món súp này chắc chắn sẽ là một trải nghiệm ẩm thực không thể quên.</p>,

    <h2>2. Thịt Nướng Cao Cấp</h2>,
    <p>**Thịt Nướng Cao Cấp** là một trong những món ăn đặc trưng của **Foodsou**, được chế biến từ các loại thịt tươi ngon nhập khẩu từ những vùng nổi tiếng về ẩm thực. Mỗi miếng thịt đều được tẩm ướp gia vị đặc biệt và nướng trên lửa vừa phải để giữ được độ mềm mại và hương vị đậm đà. Món ăn này không chỉ ngon mà còn thể hiện sự tinh tế trong từng khâu chế biến.</p>,

    <h2>3. Sushi Fusion</h2>,
    <p>Đối với những ai yêu thích món **Sushi**, Foodsou mang đến một phiên bản mới lạ và sáng tạo: **Sushi Fusion**. Đây là sự kết hợp giữa sushi truyền thống của Nhật Bản và các nguyên liệu phương Tây, tạo nên một món ăn độc đáo và đầy sáng tạo. Với sự hòa quyện giữa hương vị tươi ngon của cá, rau củ và gia vị đặc trưng, món ăn này chắc chắn sẽ làm bạn ngạc nhiên và thích thú.</p>,

    <h2>4. Mì Ý Tôm Hùm Xốt Bơ Tỏi</h2>,
    <p>Với sự kết hợp giữa **Mì Ý** và **Tôm Hùm**, món ăn này tại **Foodsou** mang lại một trải nghiệm ẩm thực vô cùng đặc biệt. Tôm hùm được chế biến tỉ mỉ, kết hợp cùng sợi mì Ý mềm mại, và xốt bơ tỏi béo ngậy, tạo nên một món ăn vừa lạ miệng lại vô cùng hấp dẫn. Đây chắc chắn là món ăn bạn không thể bỏ qua khi đến với chúng tôi.</p>,

    <h2>5. Bánh Mousse Chocolate</h2>,
    <p>Để kết thúc bữa ăn một cách ngọt ngào, **Bánh Mousse Chocolate** tại **Foodsou** là lựa chọn hoàn hảo. Với lớp mousse mềm mịn, chocolate đậm đà và trang trí tinh tế, món tráng miệng này sẽ làm hài lòng bất kỳ tín đồ của món ngọt nào. Đảm bảo bạn sẽ cảm nhận được sự hòa quyện giữa vị ngọt và đắng trong từng miếng bánh.</p>,

    <p>Với những món ăn đặc trưng như vậy, **Foodsou** không chỉ mang đến cho bạn những bữa ăn ngon mà còn là một trải nghiệm ẩm thực độc đáo, nơi bạn có thể khám phá những hương vị mới lạ và phong phú. Hãy đến và thử ngay những món ăn này để cảm nhận sự khác biệt tại **Foodsou**!</p>,

  ]
},
{
  id: 5,
  title: "Foodsou Khuyến Mãi Mới - Giảm Giá 20% Cho Khách Hàng Mới",
  description: "Khám phá khuyến mãi mới tại Foodsou: Giảm giá 20% cho khách hàng mới. Đến ngay và thưởng thức những món ăn tuyệt vời với mức giá ưu đãi chưa từng có!",
  imageUrl: anhnew5, // Chỉnh lại hình ảnh nếu cần
  date: "Th 6 01/11/2024",
  content: [
    <h1>Foodsou Khuyến Mãi Mới - Giảm Giá 20% Cho Khách Hàng Mới</h1>,
    <p>Chúng tôi rất vui khi được thông báo đến bạn về chương trình <strong>khuyến mãi đặc biệt</strong> tại <strong>Foodsou</strong>. Từ nay đến cuối tháng, tất cả khách hàng mới sẽ nhận được <strong>giảm giá 20%</strong> cho tổng hóa đơn khi đến thưởng thức các món ăn tại nhà hàng. Đây là cơ hội tuyệt vời để bạn khám phá thực đơn phong phú và thưởng thức những món ăn tuyệt vời với mức giá ưu đãi chưa từng có.</p>,

    <h2>Điều Kiện Khuyến Mãi</h2>,
    <p>Để nhận được ưu đãi giảm giá 20%, bạn chỉ cần là <strong>khách hàng mới</strong> của Foodsou và thực hiện một trong các bước sau:</p>,
    <ul><li>Đặt bàn qua website chính thức của Foodsou.</li><li>Đến trực tiếp nhà hàng và yêu cầu áp dụng chương trình khuyến mãi.</li></ul>,
    <p>Lưu ý: Khuyến mãi này chỉ áp dụng cho khách hàng lần đầu tiên đến Foodsou và không áp dụng cho các chương trình khuyến mãi khác.</p>,

    <h2>Thực Đơn Đặc Sắc Chờ Bạn Khám Phá</h2>,
    <p>Tại <strong>Foodsou</strong>, chúng tôi tự hào mang đến những món ăn đặc sắc từ các nền ẩm thực khác nhau trên thế giới. Bên cạnh việc nhận ưu đãi giảm giá, bạn còn có cơ hội thưởng thức các món ăn đặc trưng như:</p>,
    <ul><li><strong>Súp Trái Cây Tươi Mát:</strong> Khai vị nhẹ nhàng và đầy hương vị từ các loại trái cây tươi ngon.</li>
    <li><strong>Thịt Nướng Cao Cấp:</strong> Thịt tươi ngon, nướng vừa phải, giữ nguyên độ mềm và hương vị đậm đà.</li>
    <li><strong>Sushi Fusion:</strong> Sự kết hợp tuyệt vời giữa sushi Nhật Bản và các nguyên liệu phương Tây đầy sáng tạo.</li>
    <li><strong>Mì Ý Tôm Hùm Xốt Bơ Tỏi:</strong> Món ăn thơm ngon với tôm hùm và mì Ý, xốt bơ tỏi béo ngậy.</li>
    <li><strong>Bánh Mousse Chocolate:</strong> Món tráng miệng ngọt ngào với chocolate đậm đà và mousse mềm mịn.</li></ul>,

    <h2>Chương Trình Khuyến Mãi Lâu Dài</h2>,
    <p>Đây chỉ là một trong những <strong>chương trình khuyến mãi</strong> mà Foodsou tổ chức dành cho các khách hàng thân thiết và khách hàng mới. Hãy theo dõi chúng tôi trên các kênh mạng xã hội để cập nhật thêm nhiều chương trình hấp dẫn khác trong tương lai. Chúng tôi luôn nỗ lực mang đến những ưu đãi tốt nhất để khách hàng có thể thưởng thức những bữa ăn ngon miệng mà không phải lo về giá cả.</p>,

    <p>Hãy nhanh chân đến Foodsou và tận hưởng những món ăn tuyệt vời cùng với <strong>giảm giá 20%</strong> cho khách hàng mới! Đừng bỏ lỡ cơ hội này để có một trải nghiệm ẩm thực đẳng cấp với mức giá ưu đãi cực kỳ hấp dẫn.</p>
  ]
},
];

const NewsDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const newsItem = newsData.find(item => item.id === parseInt(id)); // Tìm tin tức theo ID

  if (!newsItem) {
    return <div>Không tìm thấy tin tức.</div>; // Hiển thị thông báo nếu không tìm thấy
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
      <CardMedia
    component="img"
    image={newsItem.imageUrl}
    alt={newsItem.title}
    style={{
        width: '80%',  // Giảm kích thước ảnh xuống 80% chiều rộng của khung
        height: 'auto', // Chiều cao tự động để giữ tỷ lệ ảnh
        maxHeight: '500px', // Giới hạn chiều cao tối đa của ảnh xuống 500px
        margin: 'auto', // Căn giữa ảnh trong khung
        display: 'block' // Đảm bảo ảnh là một block để căn giữa tốt hơn
  }}
        />
        <CardContent>
          <Typography variant="h4" className="font-semibold mb-2">{newsItem.title}</Typography>
          <Typography variant="body2" color="textSecondary" className="mb-1">{newsItem.date}</Typography>
          <Typography variant="body1" className="mb-4">{newsItem.content}</Typography>
          <Link to="/news" style={{ textDecoration: 'none' }}>
            <Button color="primary">Quay lại</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsDetail;
