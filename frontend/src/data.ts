interface SliderItem {
    id: number;
    img: string;
    title: string;
    desc: string;
    bg: string;
  }

  interface categories{
    id: number;
    img: string;
    title:string;
    category: string;
  }

  interface products {
    id: number;
    img: string;
  }

export const sliderItems: SliderItem[] = [
    {
      id: 1,
      img: "/slider/img3.png",
      title: "SUMMER SALE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "#f5fafd",
    },
    {
      id: 2,
      img: "/slider/img2.png",
      title: "WINTER COLLECTION",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "#B0ECEC",
    },
    {
      id: 3,
      img: "/slider/img1.png",
      title: "CHRISTMAS SALE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "#fbf0f4",
    },
  ];

  export const categories:categories[] = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      title: "WOMAN",
      category: "Woman"
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      title: "MEN",
      category: "Men"
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      title: "ALL",
      category: "all"
    },
  ];

  export const popularProducts:products[] = [
    {
      id:1,
      img:"https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    },
    {
      id:2,
      img:"https://i.ibb.co/CzX9TCW/img.webp",
    },
    {
      id:3,
      img:"https://i.ibb.co/bN0f54q/Woman-white.webp",
    },
    {
      id:4,
      img:"https://i.ibb.co/nMpr7KJ/Relaxed-Fit-Jacket-Men-brown.webp",
    },
    {
      id:5,
      img:"https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
    },
    {
      id:6,
      img:"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
    },
    {
      id:7,
      img:"https://www.nicepng.com/png/full/137-1378702_transparent-aesthetic-clothes-png.png",
    },
    {
      id:8,
      img:"https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
    },
  ]