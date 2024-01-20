export default function Lights()
{
    return <>
        <directionalLight
            castShadow
            position={ [ 4, 4, 1 ] }
            intensity={ 4.5 } 
        />
        <ambientLight intensity={ 1.5 } />
    </>
}