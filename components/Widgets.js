import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import News from './News'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Widgets({ newsResults, randomUserList }) {
  const [articleNum, setArticleNum] = useState(3)
  const [followSuggestionCount, setFollowSuggestionCount] = useState(3)
  return (
    <div className='xl:w-[600px] hidden lg:inline ml-8 space-y-5'>
      {/* Search Twitter */}
      <div className='w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50'>
        <div className='flex items-center p-3 rounded-full  relative'>
          <MagnifyingGlassIcon className='h-5 z-50 text-gray-500' />
          <input
            className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 '
            type='text'
            placeholder='Search Twitter'
          />
        </div>
      </div>

      {/* News Results */}
      <div className='text-gray-700 bg-gray-100 space-y-3 rounded-xl pt-2 w-[90%] xl:w-[75%]'>
        <h4 className='font-bold text-xl px-4'>What&apos;s happening</h4>
        <AnimatePresence>
        {newsResults && newsResults.slice(0, articleNum).map((article) => (

            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News
                key={article.title}
                article={article}
                setArticleNum={setArticleNum}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className='text-blue-300 pl-4 pb-3 hover:text-blue-400 cursor-pointer'
          onClick={() => setArticleNum(articleNum + 3)}
        >
          Show More
        </button>
      </div>

      {/* Who To Follow  */}
      <div className='sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]'>
        <h4 className='font-bold text-xl px-4'>Who To Follow</h4>
        <AnimatePresence>
          {randomUserList.slice(0, followSuggestionCount).map((user) => (
            <motion.div
              key={user.login.uuid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out'
                key={user.login.uuid}
              >
                <img
                  src={user.picture.thumbnail}
                  alt='profile picture'
                  width='40'
                  className='rounded-full'
                />
                <div className='truncate ml-4 leading-5'>
                  <h4 className='font-bold hover:underline text-[14px]'>
                    {user.login.username}
                  </h4>
                  <h5 className='text-[13px] text-gray-500 truncate'>
                    {user.name.first + ' ' + user.name.last}
                  </h5>
                </div>
                <button className='ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold'>
                  Follow
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className='text-blue-300 pl-4 pb-3 hover:text-blue-400'
          onClick={() => setFollowSuggestionCount(followSuggestionCount + 3)}
        >
          Show More
        </button>
      </div>
    </div>
  )
}
