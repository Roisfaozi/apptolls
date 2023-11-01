import MainCard from '@/components/dasboard/MainCard';
import WelcomeBanner from '@/components/dasboard/Welcome Banner';
import BoxesIcons from '@/components/dasboard/icons/Boxes';
import CircleIcon from '@/components/dasboard/icons/Circle';
import RubikIcon from '@/components/dasboard/icons/Rubik';
function page() {
  const items = [
    {
      id: 0,
      name: 'Products',
      image: <BoxesIcons />,
    },
    {
      id: 1,
      name: 'License',
      image: <CircleIcon />,
    },
    {
      id: 2,
      name: 'Pages',
      image: <RubikIcon />,
    },]
  return (
    <>
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className='grid grid-cols-12 gap-6'>
        {
          items.map(item => {
            return (

              <MainCard
                key={item.id}
                id={item.id}
                name={item.name}
                icon={item.image}
              />
            )
          })
        }
      </div>
    </>

  )
}

export default page

