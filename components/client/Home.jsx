import { Banner } from './Banner'
import FavoriteBook from './FavoriteBook'
import BestSeller from './BestSeller'
import OtherBooks from './OtherBooks'
import PromoBanner from './PromoBanner'
import Review from './Review'

export const Home = () => {
  return (
    <div className='mx-auto overflow-hidden'>
      <Banner/>
      <BestSeller/>
      <FavoriteBook/>
      <PromoBanner/>
      <OtherBooks/>
      <Review/>
    </div>
  )
}
