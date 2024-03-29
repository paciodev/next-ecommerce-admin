import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
	try {
		const { userId } = auth()
		const { name, value } = await req.json()

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		if (!value) {
			return new NextResponse('Value is required', { status: 400 })
		}

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 })
		}

		const hexColorRegex = /^#?([0-9A-F]{3}){1,2}$/i;

		if (!hexColorRegex.test(value)) {
			return new NextResponse('Invalid color value. Please provide a valid hexadecimal color code.', { status: 400 });
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		})

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 })
		}

		const color = await prismadb.color.create({
			data: { name, value, storeId: params.storeId },
		})

		return NextResponse.json(color)
	} catch (error) {
		console.error('[COLORS_POST]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function GET(_req: Request, { params }: { params: { storeId: string } }) {
	try {
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 })
		}

		const colors = await prismadb.color.findMany({
			where: {
				storeId: params.storeId
			}
		})

		return NextResponse.json(colors)
	} catch (error) {
		console.error('[COLORS_GET]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}