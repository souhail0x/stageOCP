import axios from 'axios';
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
const StyledSuccessMessage = styled.div`
  background-color: ${props => props.bgColor};
  border-color: #c3e6cb;
  color: black;
  width:400px;
  padding: 0.75rem 1.25rem;
  margin-top: 1rem;
  border: 1px solid ${props => props.borderColor};
  border-radius: 0.25rem;
`;
const CommandAffirmation = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [successBgColor, setSuccessBgColor] = useState('#d4edda');
    const [borderColor, setborderColor] = useState('#d4edda');


    const [formData, setFormData] = useState({
        date: "",
        Num_Commande: "",
        panneau: "",
        tranche: "",
        niveau: "",
        mode_tir: "encore Vide",
        foration: "",
        nombre_trous: "",
        nombre_ranges: "",
        trous_range: "",
        maille_banquette: "",
        espacement: 0,
        decappage: "encore Vide",
        profondeur: "",
        zone_tir: "encore Vide",
        mode_charge: "encore Vide",
        dosage_prevu: "encore Vide",
        schema_tir: "encore Vide",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send formData to the API endpoint
        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/commandes",
                formData
            );
            console.log(response.data);
            setSuccessMessage("Les données ont été envoyées avec succès !");
            setSuccessBgColor('#d4edda')
            setborderColor('green')


        } catch (error) {
            console.error("Error adding data:", error);
            setSuccessMessage("Error adding data: Remplissez tous Les Champs");
            setSuccessBgColor('#d27a7a')
            setborderColor('red')


        }
    };


    return (
        <>

            <Titre>Suivie de performance de foration</Titre>

            <center>{successMessage && <StyledSuccessMessage bgColor={successBgColor} borderColor={borderColor}>{successMessage}</StyledSuccessMessage>}</center>

            <StyledForm>

                <div className='gridContainer'>
                    <div>
                        <StyledLabel htmlFor="date">Date:</StyledLabel>
                        <StyledInput
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <StyledLabel htmlFor="Num_Commande">Num Commande</StyledLabel>
                        <StyledInput
                            type="number"
                            id="Num_Commande"
                            name="Num_Commande"
                            value={formData.Num_Commande}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <StyledLabel htmlFor="panneauSelect">Panneau</StyledLabel>
                        <StyledSelect
                            id="panneauSelect"
                            name="panneau"
                            value={formData.panneau}
                            onChange={handleChange}
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
                        <StyledLabel htmlFor="tranche">Tranche</StyledLabel>
                        <StyledInput
                            type="text"
                            id="tranche"
                            name="tranche"
                            value={formData.tranche}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <StyledLabel htmlFor="niveau">Niveau</StyledLabel>
                        <StyledSelect
                            id="niveau"
                            name="niveau"
                            value={formData.niveau}
                            onChange={handleChange}
                        >
                            <option value="">choisir niveau</option>
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
                        <StyledLabel htmlFor="foration">Machine :</StyledLabel>
                        <StyledSelect
                            id="foration"
                            name="foration"
                            value={formData.foration}
                            onChange={handleChange}
                        >
                            <option value="">choisir machine</option>
                            <option value="PV1">PV1</option>
                            <option value="DK6">DKS</option>
                            <option value="SKF1">SKF1</option>
                            <option value="SNF2">SNF2</option>
                            <option value="D500">D500</option>
                            <option value="D700">D700</option>
                        </StyledSelect>
                    </div>
                    
                    
                    <div>
                        <StyledLabel htmlFor="profondeur">Profondeur</StyledLabel>
                        <StyledInput
                            type="text"
                            id="profondeur"
                            name="profondeur"
                            value={formData.profondeur}
                            onChange={handleChange}
                        />
                    </div>
                    
                    
                    
                    
                    
                    
                    <div>
                        <StyledLabel htmlFor="maille_banquette">Maille </StyledLabel>
                        <StyledSelect
                            id="maille_banquette"
                            name="maille_banquette"
                            value={formData.maille_banquette}
                            onChange={handleChange}
                        >
                            <option>espacement</option>
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </StyledSelect>
                    </div>
                    
                    <div>
                        <StyledLabel htmlFor="nombre_trous">Nbre des trous</StyledLabel>
                        <StyledInput
                            type="number"
                            id="nombre_trous"
                            name="nombre_trous"
                            value={formData.nombre_trous}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <StyledLabel htmlFor="trous_range">Nombre de trous par rangé</StyledLabel>
                        <StyledInput
                            type="number"
                            id="trous_range"
                            name="trous_range"
                            value={formData.trous_range}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <StyledLabel htmlFor="nombre_ranges">Nbre range</StyledLabel>
                        <StyledInput
                            type="number"
                            id="nombre_ranges"
                            name="nombre_ranges"
                            value={formData.nombre_ranges}
                            onChange={handleChange}
                        />
                    </div>
                </div>









            </StyledForm >
            <center>
                <StyledSubmitButton value="Envoyer" onClick={handleSubmit} />

            </center>
        </>
    );
}

export default CommandAffirmation;
