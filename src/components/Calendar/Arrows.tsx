export function Arrows() {
          <div className='flex justify-between'>
            <button
              className='text-gray-500'
              onClick={() => {
                setCurrentMonth(
                  format(
                    addMonths(parse(currentMonth, 'MMyyyy', new Date()), -1),
                    'MMyyyy'
                  )
                );
              }}
            >
              <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 19l-7-7 7-7'
                ></path>
              </svg>
            </button>
            <button
              className='ml-2 text-gray-500'
              onClick={() => {
                setCurrentMonth(
                  format(
                    addMonths(parse(currentMonth, 'MMyyyy', new Date()), 1),
                    'MMyyyy'
                  )
                );
              }}
            >
              <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 5l7 7-7 7'
                ></path>
              </svg>
            </button>
          </div>
