import MainCard from '@/components/dasboard/MainCard';
import Image01 from '../../../images/user-64-01.jpg';
import Image02 from '../../../images/user-64-02.jpg';
import Image03 from '../../../images/user-64-03.jpg';
function page() {
  const items = [
    {
      id: 0,
      name: 'Dominik McNeail',
      image: Image01,
      link: '#0',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 1,
      name: 'Ivan Mesaros',
      image: Image02,
      link: '#0',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 2,
      name: 'Tisha Yanchev',
      image: Image03,
      link: '#0',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },]
  return (
    <div className='grid grid-cols-12 gap-6'>
      {
        items.map(item => {
          return (
            <MainCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              link={item.link} />
          )
        })
      }
    </div>
  )
}

export default page