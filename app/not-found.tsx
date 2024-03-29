import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='h-full w-full flex flex-col items-center justify-center'>
			<h2 className='text-3xl font-semibold'>Not Found</h2>
			<p className='text-xl'>Could not find requested route</p>
			<Link href='/' className='text-md underline text-blue-400'>
				Return Home
			</Link>
		</div>
	);
}
