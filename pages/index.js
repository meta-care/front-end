import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>MetaCare</title>
        <meta name="description" content="Create your NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=' lg:grid grid-cols-2 max-w-[1400px] m-auto p-4'>
      <div>
      <div className='grid grid-cols-2'>
      <img
                src={"metacarelogo.JPG"}
                width="125px"
                height="125px"
                alt=""
              />
              <h1>Meta<span className='text-[#189BD7]'>Care</span></h1>
      </div>

        <h2>A Blockchain-based Healthcare Data Management Solution.</h2>
        <p>Track your data. Share it with your doctor. Improve yout global health.</p>
        <h3>Step 1: Connect your wallet</h3>
        <button>Connect</button>
      </div>
      <div>
      <img
                src={"blue-men.JPG"}
                width="350px"
                height="900px"
                alt=""
              />
      </div>
      </main>
    </div>
  )
}
