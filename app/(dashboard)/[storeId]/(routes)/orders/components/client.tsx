'use client';

import { useParams, useRouter } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface OrderClientProps {
	data: OrderColumn[];
}

const BillboardClient: React.FC<OrderClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<Heading
				title={`Orders (${data.length})`}
				description='Manage orders for your store'
			/>
			<Separator />
			<DataTable columns={columns} data={data} searchKey='products' />
		</>
	);
};

export default BillboardClient;
