import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const getRandom = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const sneakers = [
  {
    name: 'TIFFANY & CO. X NIKE AIR FORCE 1 LOW',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/Raffle/thumb/DZ1382-001-shoeprize-TIFFANY--CO.-X-NIKE-AIR-FORCE-1-LOW-NEW-1674532902402.png',
    price: getRandom(300000, 100000),
  },
  {
    name: 'AIR JORDAN 6 COOL GREY',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/open_raffle/main_carousel/89663/CT8529-100-shoeprize-AIR-JORDAN-6-COOL-GREY-101169-1670893419993.jpeg',
    price: getRandom(300000, 100000),
  },
  {
    name: 'NIKE DUNK LOW INDUSTRIAL BLUE',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/open_raffle/main_carousel/79127/DV0834-101-shoeprize-NIKE-DUNK-LOW-INDUSTRIAL-BLUE-100045-1664467528839.jpeg',
    price: getRandom(300000, 100000),
  },
  {
    name: 'AIR JORDAN 4 RETRO WMNS OIL GREEN',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/open_raffle/main_carousel/96145/AQ9129-103-shoeprize-AIR-JORDAN-4-RETRO-WMNS-OIL-GREEN-105239-1674698177301.jpeg',
    price: getRandom(300000, 100000),
  },
  {
    name: 'AIR JORDAN 1 HIGH 85 BLACK WHITE',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/open_raffle/main_carousel/82773/BQ4422-001-shoeprize-AIR-JORDAN-1-HIGH-85-BLACK-WHITE-92424-1666323917645.jpeg',
    price: getRandom(300000, 100000),
  },
  {
    name: 'AIR JORDAN 1 HIGH OG ELEPHANT PRINT',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/Raffle/thumb/DZ5485-052-shoeprize-AIR-JORDAN-1-HIGH-OG-ELEPHANT-PRINT-99826-1674838029870.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: 'AIR JORDAN 1 HIGH OG UNIVERSITY BLUE',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/Raffle/thumb/DZ5485-400-shoeprize-AIR-JORDAN-1-HIGH-OG-UNIVERSITY-BLUE-102573-1668862642299.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: 'NIKE AIR MAX 1 SAFARI SUMMIT WHITE',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/open_raffle/main_carousel/None/FB5059-100-shoeprize-NIKE-AIR-MAX-1-SAFARI-SUMMIT-WHITE-107652-1675151255518.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: 'NIKE AIR FORCE 1 LOW PRM BLUE TINT',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/Raffle/thumb/DZ2786-400-shoeprize-NIKE-AIR-FORCE-1-LOW-PRM-BLUE-TINT-106781-1673859244360.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: 'NIKE AIR FORCE 1 LOW NIKE CLASSIC',
    contents: `{"blocks":[{"key":"5bas2","text":"조던 나이키 \\n\\n 신기에는 최고이다. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://static.shoeprize.com/Raffle/thumb/DV7183-100-shoeprize-NIKE-AIR-FORCE-1-LOW-NIKE-CLASSIC-NEW-1669196381175.jpg',
    price: getRandom(300000, 100000),
  },
];

const tShirt = [
  {
    name: 'College Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM11001XJBKX/0ZXTEM11001XJBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Side Shark Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM11000XJBKX/0ZXTEM11000XJBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'BAPE Thermography Polygon College Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM110051KBKX/0ZXTEM110051KBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'BAPE Thermography Shark Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM110028KBKX/0ZXTEM110028KBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Year Of The Rabbit Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM11000SKBKX/0ZXTEM11000SKBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'X UNDFTD College Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM110921JBKX/0ZXTEM110921JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Christmas Busy With Work Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEMX10014JBKX/0ZXTEMX10014JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Christmas Ape Head Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM110013JBKX/0ZXTEM110013JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Tiger Camo Graduation College Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEMX09001JBKX/0ZXTEMX09001JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Shark Relaxed Fit Tee',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 티셔츠 \\n\\n 원숭이 티셔츠. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM109010JBKX/0ZXTEM109010JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
];

const pants = [
  {
    name: 'Tiger Camo Relaxed Fit Military Pants',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXPTMX52002JBKX/0ZXPTMX52002JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'X JJJJOUND College Sweat Pants',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXPTM152904JNYX/0ZXPTM152904JNYX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'X UNDFTD Color Camo Flannel Pants',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXPTM152907JGRX/0ZXPTM152907JGRX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'X UNDFTD Color Camo Multi Pouch Pocket Pants',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXPTM152909JGRX/0ZXPTM152909JGRX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'BAPE Loose Fit Chino',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXPTM15206XHBKX/0ZXPTM15206XHBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'One Point Relaxed Fit Chino Pants',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXPTM152017JBGX/0ZXPTM152017JBGX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Multi Motif Leather Pocket Chino Shorts',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSPM153006JBGX/0ZXSPM153006JBGX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'X Heron Preston Mix 1st Camo Duck Painter Pants M3',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXPTM152903IPPX/0ZXPTM152903IPPX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pleated pants',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/BBKPTPT6400MJBKX/BBKPTPT6400MJBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'X M&N Miami Heat Jersey Shorts',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 바지  \\n\\n 베이프는 카모가 진리지 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSPM153904IBDX/0ZXSPM153904IBDX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
];

const cap = [
  {
    name: 'Color Camo NYC Logo Mesh Cap',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXCPM180004JGRX/0ZXCPM180004JGRX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'One Point Panel Cap',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXCPM180010JBKX/0ZXCPM180010JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'BAPE STA Mesh Cap',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXCPM180005JGRR/0ZXCPM180005JGRR-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Grid Camo Bucket Hat',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXHTM181005JBKX/0ZXHTM181005JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Snake Panel Cap',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXCPM180002JBKX/0ZXCPM180002JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'BAPE Panel Cap',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXCPM180003JBLX/0ZXCPM180003JBLX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'STA Ape Head Leather Patched Mesh Cap',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXCPM180011JBKX/0ZXCPM180011JBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'X New Era 1st Camo 9 Fifty Cap',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXCPMX80907IGRX/0ZXCPMX80907IGRX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Baby Milo bucket hat',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0MXHTM4120XXIPPZ/0MXHTM4120XXIPPZ-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'X New Era Wrangler Label 9 Fifty Snap Back Cap',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 모자 \\n\\n 막 쓰자 . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXCPM180909IBLX/0ZXCPM180909IBLX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
];

const hoodie = [
  {
    name: 'X Minions 1st Camo Minions Shark Full Zip Hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115902JYEX/0ZXSWM115902JYEX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Distressed logo hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/BBKSWSW3311MJGRX/BBKSWSW3311MJGRX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Grid Camo Shark Full Zip Hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115005JPPX/0ZXSWM115005JPPX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Color Camo Shark Full Zip Hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115017JGRS/0ZXSWM115017JGRS-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Color Camo Relaxed Fit Full Zip Hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115008JGRX/0ZXSWM115008JGRX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'BAPE Thermography Shark Full Zip Hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115011KBKX/0ZXSWM115011KBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Honeycomb Camo Shark Full Zip hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115009KGYX/0ZXSWM115009KGYX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'BAPE STA Logo Relaxed Fit Pullover Hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM114015KBKX/0ZXSWM114015KBKX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cutting ABC Camo Thermography Relaxed Fit Pullover',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM114008KNYX/0ZXSWM114008KNYX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
  {
    name: '1st Camo Full Zip Hoodie',
    contents: `{"blocks":[{"key":"5bas2","text":"베이프 후디 \\n\\n 막 입기 최고  . ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":13,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115014JYEX/0ZXSWM115014JYEX-pdp-1.jpg?x-oss-process=image/resize,m_pad,h_750,w_600/auto-orient,1/quality,Q_80',
    price: getRandom(300000, 100000),
  },
];

const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...tShirt,
  ...pants,
  ...cap,
  ...hoodie,
];

async function main() {
  await prisma.products.deleteMany({});

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    });
    console.log(`Created id :${product.id} `);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
