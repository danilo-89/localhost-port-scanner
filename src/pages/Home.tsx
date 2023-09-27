// Components
import InfoSection from '@/components/InfoSection'
import ScannedPorts from '@/components/ScannedPorts'
import Controls from '@/components/Controls'
import Footer from '@/components/Footer'

const Home = () => {
    return (
        <>
            <div className="mx-auto min-w-[640px] max-w-[940px]">
                <InfoSection />
                <Controls />
                <ScannedPorts />
            </div>

            <Footer />
        </>
    )
}

export default Home
