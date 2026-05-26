import type { Metadata } from 'next'
import { HomePageContent } from '../components/HomePageContent'

export const metadata: Metadata = {
  title: 'FOSSBilling - Free and open source hosting automation'
}

export default function HomePage() {
  return <HomePageContent />
}
