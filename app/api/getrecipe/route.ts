import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/database'
import Herb from '@/models/Herb'
import ingredients from '@/lib/ingredients.json'
import { qtyDict } from './recipe.helper'

type ResponseData = {
    message: string
}

interface GetRecipeRequest extends NextApiRequest {
    body: {
        userSelection: Array<String>
    }
}

type IngHerb = {
    name: String,
    nameScientific: String,
    uses: Array<String>,
    sideEffects: Array<String>,
    interactions: Array<String>
}

export async function POST(
    req: Request,
    res: NextApiResponse<ResponseData>
) {
    try {
        await connectDB()
        //const herbs = await Herb.find()
        const data = await req.json()
        const { userSelection }: { userSelection: Array<String> } = data
        const herbs: Array<IngHerb> = ingredients
        const matchingHerbs: Array<IngHerb> = []
        const matchingHerbNames: Array<String> = []

        for (let choice of userSelection) {
            const matches: Array<IngHerb> = herbs.filter(herb => herb.uses.includes(choice))
            let rng: number = Math.floor(Math.random() * matches.length)
            while (matches.length > 0 && matchingHerbs.length < qtyDict[userSelection.length.toString() as keyof typeof qtyDict]) {
                if (!matchingHerbNames.includes(matches[rng].name)) {
                    matchingHerbs.push(matches[rng])
                    matchingHerbNames.push(matches[rng].name)
                }
                matches.splice(rng, 1)
                rng = Math.floor(Math.random() * matches.length)
            }
        }
        console.log('- New recipe: ', matchingHerbs.reduce((a, b) => a + `${b.name}, `, ""))
        return NextResponse.json(JSON.stringify(matchingHerbs))
    } catch (err) {
        console.log(err)
    }
}