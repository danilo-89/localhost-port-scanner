import { usePortsForScanningContext } from '@/context/PortsForScanningContext';

const InfoSection = () => {
	const { state } = usePortsForScanningContext();

	return (
		<section className='p-8 w-full bg-yankeesBlue mb-5 flex rounded-lg'>
			<div>
				Total ports for scanning:{' '}
				<span className='font-bold'>{state.length}</span>
			</div>
			<div className='ml-auto'>
				<button type='button'>settings</button>
			</div>
		</section>
	);
};

export default InfoSection;
