import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import HistorySection from '@/components/HistorySection';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import PracticalInfoSection from '@/components/PracticalInfoSection';
import WeatherSection from '@/components/WeatherSection';
import TransportSection from '@/components/TransportSection';
import RouteSection from '@/components/RouteSection';
import TopSights from '@/components/TopSights';
import BridgeJsonLd from '@/components/BridgeJsonLd';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import FAQSection from '@/components/FAQSection';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <BridgeJsonLd />
        <Hero />
        <Intro />
        <HistorySection />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <PracticalInfoSection />
        <WeatherSection />
        <TransportSection />
        <RouteSection />
        <TopSights />
        <PhotoSpotsSection />
        <HotelsSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
        <FAQSection />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
