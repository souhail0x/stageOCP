import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const Titre = styled.h1`
    font-familly:poppins;
    text-align:center;
    margin:70px auto 50px; 

`;
const StyledForm = styled.form`
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    .gridContainer{
        display:grid;
        grid-template-columns: repeat(4, 1fr); /* 4 columns with equal width */
        grid-template-rows: repeat(3, 100px);
        gap:10px;
    }
    
    border-radius: 5px;
    .div{
        width: 100px;
    }
    textarea{
        
        width: 1020px;
        grid-column: span 4;
        height:100px;
        padding:10px;
        resize: none; /* Allow both vertical and horizontal resizing */
        overflow: auto;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
    }
    

`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box; /* Ensure padding and border are included in the width */
`;
const StyledSelect = styled.select`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

const StyledSubmitButton = styled.input.attrs({ type: 'submit' })`
    background-color: #695cfe;
    color: #fff;
    padding: 10px 20px;
    border: none;
   
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const SimpleForm = () => {

    const [longueur, setLongueur] = useState('');
    const [largeur, setLargeur] = useState('');
    const [volume, setVolume] = useState('');
    const [surface, setSurface] = useState('');

    useEffect(() => {

        setSurface(longueur * largeur)
        console.log(surface);
        console.log(longueur);
        console.log(largeur);
    }, [surface, volume])
    return (
        <>
            <Titre>Situation Machine du Foration </Titre>
            <StyledForm>
                <div className='gridContainer'>
                    <div>
                        <StyledLabel htmlFor="input1">Date:</StyledLabel>
                        <StyledInput type="date" id="input1" name="Date" />
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Machine</StyledLabel>
                        <StyledInput type="text" id="input1" name="machine" />
                    </div>
                    <div>
                        <StyledLabel htmlFor="input1">Tranchee</StyledLabel>
                        <StyledInput type="text" id="input1" name="tranche" />
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Panneau</StyledLabel>
                        <StyledSelect
                            id="panneau"
                            name="panneau"

                        >
                            <option value="">choisir panneau</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                            <option value="P3">P3</option>
                            <option value="P4">P4</option>
                            <option value="P5">P5</option>
                            <option value="P6">P6</option>
                            <option value="P7">P7</option>
                            <option value="P8">P8</option>
                        </StyledSelect>
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Niveau</StyledLabel>
                        <StyledSelect
                            id="niveau"
                            name="niveau"

                        >
                            <option value="">select niveau</option>
                            <option value="R+C1">R+C1</option>
                            <option value="R+C2">R+C2</option>
                            <option value="R+C3">R+C3</option>
                            <option value="R+C4">R+C4</option>
                            <option value="R+C5">R+C5</option>
                            <option value="R+C6">R+C6</option>
                            <option value="Int1/2">Int1/2</option>
                            <option value="Int2/3">Int2/3</option>
                            <option value="Int3/4">Int3/4</option>
                            <option value="Int4/5">Int4/5</option>
                            <option value="Int5/6">Int5/6</option>
                            <option value="Int3/5">Int3/5</option>
                        </StyledSelect>
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Profondeur</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" />
                    </div>
                    <div>
                        <StyledLabel htmlFor="input1">Maille</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" />
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Situation</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" />
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Nbre des trous</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" />
                    </div>
                    <div>
                        <StyledLabel htmlFor="input1">Longueur</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" onChange={(e) => setLongueur(e.target.value)} />
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Largeur</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" onChange={(e) => setLargeur(e.target.value)} />
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Metrage foree</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" />
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Heure de marche</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" />
                    </div>
                    <div>
                        <StyledLabel htmlFor="input1">Rendement</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" />
                    </div>

                    <div>
                        <StyledLabel htmlFor="input1">Nbre range</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" />
                    </div>
                    <div>
                        <StyledLabel disabled htmlFor="input1">Volume</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" value={volume} />
                    </div>

                    <div>
                        <StyledLabel disabled htmlFor="input1">Surface</StyledLabel>
                        <StyledInput type="text" id="input1" name="input1" value={longueur} />
                    </div>



                </div>
                <div className='textarea'>
                    <StyledLabel htmlFor="input1">Observation</StyledLabel>
                    <textarea type="text" id="input1" name="input1" />
                </div>







            </StyledForm>
            <center>
                <StyledSubmitButton value="Submit" />

            </center>
        </>
    );
}

export default SimpleForm;
