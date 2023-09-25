// Components
import InfoSection from '@/components/InfoSection'
import ScannedPorts from '@/components/ScannedPorts'
import Controls from '@/components/Controls'
import Footer from '@/components/Footer'

const Home = () => {
    // console.log(range(1, 10));
    // console.log(range(10, 1));

    // const scanPorts = async () => {
    // 	try {
    // 		const response = await window.electronAPI.scanPorts();
    // 		console.log(response);
    // 	} catch (error: unknown) {
    // 		console.log(error);
    // 	}
    // };

    return (
        <>
            <div className="mx-auto min-w-[640px] max-w-[940px]">
                <div>
                    <InfoSection />
                    <Controls />
                    <ScannedPorts />
                </div>
                {/* <div>
                    <button
                        type="button"
                        onClick={() => {
                            window.electronAPI.startServer()
                        }}
                    >
                        Start Server
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            window.electronAPI.stopServer()
                        }}
                    >
                        Stop Server
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            window.electronAPI.scanPort()
                        }}
                    >
                        Scan Port
                    </button>
                </div> */}
            </div>

            <Footer />
        </>
    )
}

export default Home
