export const banners = Array.from({ length: 30 }, (_, i) => ({
    img: `https://picsum.photos/300/200?random=${i + 1}`,
    title: `방탈출 ${i + 1}`,
    rating: (Math.random() * 5).toFixed(1), // 0~5점 랜덤
  }));