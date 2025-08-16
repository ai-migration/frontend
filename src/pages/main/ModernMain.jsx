import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ModernMain() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero section slides
  const heroSlides = [
    {
      title: "혁신적인 디지털 경험",
      subtitle: "React로 만드는 모던한 웹 애플리케이션",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1600&h=900&fit=crop",
    },
    {
      title: "빠르고 효율적인 개발",
      subtitle: "최신 기술로 구현하는 웹 서비스",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=900&fit=crop",
    },
    {
      title: "사용자 중심 디자인",
      subtitle: "직관적이고 아름다운 인터페이스",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1600&h=900&fit=crop",
    },
  ];

  // Features data
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "빠른 성능",
      description: "최적화된 코드로 빠른 로딩 속도와 부드러운 사용자 경험을 제공합니다.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "반응형 디자인",
      description: "모든 디바이스에서 완벽하게 작동하는 반응형 레이아웃을 구현합니다.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "보안 강화",
      description: "최신 보안 기술로 사용자 데이터를 안전하게 보호합니다.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "맞춤형 서비스",
      description: "비즈니스 요구사항에 맞는 커스터마이징이 가능합니다.",
    },
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="space-x-4">
              <Link to="/about" className="btn-primary">
                시작하기
              </Link>
              <Link to="/inform" className="btn-secondary bg-white/20 border-white text-white hover:bg-white hover:text-primary">
                더 알아보기
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              핵심 기능
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              최신 기술과 트렌드를 반영한 다양한 기능을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-4xl font-bold mb-4">
            지금 시작하세요
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            혁신적인 웹 경험을 만들어보세요. 전문가들이 도와드립니다.
          </p>
          <div className="space-x-4">
            <Link to="/signup" className="btn-secondary bg-white text-primary hover:bg-gray-100">
              무료로 시작하기
            </Link>
            <Link to="/support/contact" className="btn-secondary">
              문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-5xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-gray-600">활성 사용자</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-600">서비스 가동률</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">고객 지원</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              최신 소식을 받아보세요
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              새로운 기능과 업데이트 소식을 이메일로 전달해드립니다
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="btn-primary">
                구독하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}