"use client"

import { useState, useEffect } from 'react'
import OptionSelected from '@/components/options/OptionSelected'
import Option from '@/components/options/Option'
import AlertMessage from '@/components/ui/Alert'
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'

const choices = [
    'sadness',
    'anxiety',
    'stress',
    'insomnia',
    'tiredness',
    'headache',
    'indigestion',
    'restlessness',
    'concentration'
]

type Ingredient = {
    name: String,
    nameScientific: String,
    uses: Array<String>,
    sideEffects: Array<String>,
    interactions: Array<String>
}

export default function Home() {
    const [selected, setSelected] = useState<Array<String>>([])
    const [maxSelected, setMaxSelected] = useState<Boolean>(false)
    const [duplicate, setDuplicate] = useState<Boolean>(false)
    const [recipe, setRecipe] = useState<Array<Ingredient>>([])

    function selectOption(name: String) {
        if (selected.length < 3 && !selected.find(x => x === name)) {
            setSelected([...selected, name])
            setDuplicate(false)
            setMaxSelected(false)
        }
        else if (selected.length >= 3) setMaxSelected(true)
        if (selected.find(x => x === name) && selected.length < 3) setDuplicate(true)
    }

    function removeOption(name: String) {
        setSelected(selected.filter(x => x !== name))
        setMaxSelected(false)
        setDuplicate(false)
    }

    async function getRecipe(userSelection: Array<String>) {
        const response = await fetch('/api/getrecipe', {
            "method": "POST",
            "body": JSON.stringify({ userSelection: userSelection }),
            "headers": {
                "Content-Type": "application/json"
            }
        })
        const tea_recipe = await response.json()
        if (tea_recipe) setRecipe(JSON.parse(tea_recipe))
        else return false
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-6 p-24 max-w-xl m-auto">
            <h2>I'm struggling with...</h2>
            <div className="flex gap-4 items-center justify-center">
                {selected.length > 0 && selected.map((x, i) => (
                    <OptionSelected name={x} key={`${i}${x}`} removeOption={removeOption} />
                ))}
            </div>
            {maxSelected && <AlertMessage message={'You may only select up to 3 options.'} />}
            {duplicate && <AlertMessage message={'You have already selected this option.'} />}
            <div className="flex flex-wrap gap-3 items-center justify-center">
                {choices.length > 0 && choices.map((x, i) => (
                    <Option name={x} key={`${i}${x}`} selectOption={selectOption} />
                ))}
            </div>
            <button className="btn btn-primary" onClick={() => getRecipe(selected)}>
                Get Recipe
                <ArrowSmallRightIcon className="w-4 h-4" />
            </button>
            {recipe && recipe.map((ingredient, index) => {
                return <div key={index}>{ingredient.name}</div>
            })}
        </main>
    )
}
