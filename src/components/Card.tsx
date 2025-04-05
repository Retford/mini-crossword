interface Props {
  desc: string;
  img: string;
  button: string;
  className?: string;
  onStart?: () => void;
  onRestart?: () => void;
}

export const Card = ({
  desc,
  img,
  button,
  className,
  onStart,
  onRestart,
}: Props) => {
  return (
    <div className='relative w-full h-svh sm:w-[400px] sm:h-[700px] bg-[#5A82B4] sm:rounded-lg flex flex-col items-center justify-center font-subtitle gap-8 shadow-xl shadow-gray-400'>
      <div className='absolute top-2 right-2 text-black'>
        <svg width='40' height='40' viewBox='0 0 24 24'>
          <path
            fill='#000000'
            d='m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z'
          />
        </svg>
      </div>
      <div className='flex flex-col justify-center items-center text-center'>
        <h3 className='font-title text-sm'>The New York Times</h3>
        <h1 className='text-3xl font-black leading-8 pb-4'>Crossword</h1>
        <h2 className={`text-4xl font-black ${className}`}>{desc}</h2>
        <div>
          <img
            src={img}
            alt='gif'
            className='object-contain w-[300px] h-[350px]'
          />
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-3'>
        {onStart && (
          <button
            onClick={onStart}
            className='bg-white py-2 px-10 text-[#5A82B4] font-bold rounded-3xl cursor-pointer'
          >
            {button}
          </button>
        )}

        {onRestart && (
          <button
            onClick={onRestart}
            className='bg-white py-2 px-10 text-[#5A82B4] font-bold rounded-3xl cursor-pointer'
          >
            {button}
          </button>
        )}
        {button === 'Play' && (
          <button className='font-extralight text-sm'>Get the App</button>
        )}
      </div>
    </div>
  );
};
