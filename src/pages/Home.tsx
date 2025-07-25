import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import heroImage from "@/assets/hero-sailboat.jpg";
import compassIcon from "@/assets/compass-icon.png";

const Home = () => {
  const [whyApi, setWhyApi] = useState<any>();
  const [whyCurrent, setWhyCurrent] = useState(0);
  const [storiesApi, setStoriesApi] = useState<any>();
  const [storiesCurrent, setStoriesCurrent] = useState(0);
  const [whyAutoplay, setWhyAutoplay] = useState(true);
  const [storiesAutoplay, setStoriesAutoplay] = useState(true);
  const whyIntervalRef = useRef<NodeJS.Timeout>();
  const storiesIntervalRef = useRef<NodeJS.Timeout>();

  // Why Sailcraft carousel auto-rotation
  useEffect(() => {
    if (!whyApi || !whyAutoplay) return;

    whyIntervalRef.current = setInterval(() => {
      whyApi.scrollNext();
    }, 3000);

    return () => {
      if (whyIntervalRef.current) {
        clearInterval(whyIntervalRef.current);
      }
    };
  }, [whyApi, whyAutoplay]);

  useEffect(() => {
    if (!whyApi) return;

    setWhyCurrent(whyApi.selectedScrollSnap());
    whyApi.on("select", () => {
      setWhyCurrent(whyApi.selectedScrollSnap());
    });
  }, [whyApi]);

  // Success Stories carousel auto-rotation
  useEffect(() => {
    if (!storiesApi || !storiesAutoplay) return;

    storiesIntervalRef.current = setInterval(() => {
      storiesApi.scrollNext();
    }, 3000);

    return () => {
      if (storiesIntervalRef.current) {
        clearInterval(storiesIntervalRef.current);
      }
    };
  }, [storiesApi, storiesAutoplay]);

  useEffect(() => {
    if (!storiesApi) return;

    setStoriesCurrent(storiesApi.selectedScrollSnap());
    storiesApi.on("select", () => {
      setStoriesCurrent(storiesApi.selectedScrollSnap());
    });
  }, [storiesApi]);

  const handleWhyIndicatorClick = (index: number) => {
    setWhyAutoplay(false);
    if (whyIntervalRef.current) {
      clearInterval(whyIntervalRef.current);
    }
    whyApi?.scrollTo(index);
  };

  const handleStoriesIndicatorClick = (index: number) => {
    setStoriesAutoplay(false);
    if (storiesIntervalRef.current) {
      clearInterval(storiesIntervalRef.current);
    }
    storiesApi?.scrollTo(index);
  };

  const metrics = [
    { value: "40+", label: "Partnerships" },
    { value: "80%", label: "ROI" },
    { value: "20%", label: "Cost Efficiency" }
  ];

  const pillars = [
    {
      title: "Revenue Growth",
      description: "Maximize profits with data-driven sales tactics and AI-enhanced marketing strategies.",
      icon: "📈"
    },
    {
      title: "Operational Efficiency", 
      description: "Streamline processes for cost savings and improved productivity across your operations.",
      icon: "⚙️"
    },
    {
      title: "Strategic Planning",
      description: "Build a roadmap for long-term success with comprehensive growth strategies.",
      icon: "🎯"
    }
  ];

  const whyItems = [
    {
      title: "Holistic Solutions",
      description: "A one-stop shop for all SME needs, reducing complexity.",
      icon: "🏢"
    },
    {
      title: "Customized Approach", 
      description: "Tailored strategies designed to meet specific business goals.",
      icon: "🎯"
    },
    {
      title: "Proven Results",
      description: "A track record of empowering SMEs to achieve sustainable growth.",
      icon: "📈"
    },
    {
      title: "Local Advantage",
      description: "Deep understanding of Kenya's business environment, ensuring relevance and impact.",
      icon: "🌍"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center bg-white overflow-hidden px-4 py-20">
        <div className="absolute inset-0 wave-texture opacity-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <img src={compassIcon} alt="Compass" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-6 compass-spin" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sailcraft-teal mb-6 fade-in-up leading-tight">
            We Engineer Growth—Not Just Campaigns
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-sailcraft-dark mb-8 fade-in-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Unlock your SME's potential with AI-driven strategies tailored for East Africa's dynamic market
          </p>
          <Button 
            asChild 
            size="lg" 
            className="btn-cta pulse-cta text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 fade-in-up w-full sm:w-auto"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/contact">Launch My Growth Plan</Link>
          </Button>
        </div>
      </section>

      {/* Why Sailcraft Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sailcraft-teal mb-4">Why Sailcraft?</h2>
            <p className="text-xl text-sailcraft-dark">Four pillars that set us apart</p>
          </div>
          <Carousel 
            setApi={setWhyApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {whyItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="card-sailcraft text-center h-full">
                    <CardHeader>
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <CardTitle className="text-sailcraft-teal">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sailcraft-dark text-base">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {whyItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  whyCurrent === index ? 'bg-sailcraft-teal' : 'bg-gray-300'
                }`}
                onClick={() => handleWhyIndicatorClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-32 h-1 bg-sailcraft-teal mx-auto mb-6 wave-animate"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-sailcraft-teal mb-4">How We Help</h2>
            <p className="text-lg sm:text-xl text-sailcraft-dark">Strategic growth across three key areas</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="text-center px-4">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{pillar.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-sailcraft-teal mb-3 sm:mb-4">{pillar.title}</h3>
                <p className="text-sailcraft-dark text-base sm:text-lg leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Metrics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sailcraft-teal mb-4">Proven Results</h2>
            <p className="text-xl text-sailcraft-dark">From our work with East Africa's top SMEs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-sailcraft-orange mb-2">
                  {metric.value}
                </div>
                <div className="text-lg text-sailcraft-dark font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Success Stories Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sailcraft-teal mb-4">Success Stories</h2>
            <p className="text-xl text-sailcraft-dark">See how we've transformed businesses</p>
          </div>
          <Carousel 
            setApi={setStoriesApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {[
                { title: "Kenya Glamour Retail", snippet: "Increased sales by 150% through strategic campaigns" },
                { title: "Pollwise Transformation", snippet: "Streamlined operations reducing costs by 40%" },
                { title: "Thika Textiles", snippet: "Strategic planning led to 200% revenue growth" }
              ].map((story, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="card-sailcraft hover:border-sailcraft-orange cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="text-sailcraft-teal">{story.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sailcraft-dark">
                        {story.snippet}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  storiesCurrent === index ? 'bg-sailcraft-teal' : 'bg-gray-300'
                }`}
                onClick={() => handleStoriesIndicatorClick(index)}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-sailcraft-teal text-sailcraft-teal hover:bg-sailcraft-teal hover:text-white">
              <Link to="/success">View All Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 mx-4 sm:mx-6 lg:mx-8 my-12">
        <div className="bg-sailcraft-teal rounded-2xl max-w-4xl mx-auto">
          <div className="text-center px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Outperform Your Limits?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join East Africa's top SMEs who trust Sailcraft for their growth journey
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-sailcraft-orange hover:bg-sailcraft-orange/90 text-white text-lg px-8 py-6 pulse-cta"
            >
              <Link to="/contact">Schedule a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
