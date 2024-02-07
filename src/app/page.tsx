import dynamic from 'next/dynamic'

const Bifrost = dynamic(() => import('app/module/Bifrost'), {
    ssr: false,
})
export default function Home() {
    return (
        <main>
          <Bifrost/>
        </main>
    );

}
