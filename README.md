# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and was developed with the following [requirements](https://transportedlabs-my.sharepoint.com/:w:/r/personal/ngluschenko_transportedlabs_com/_layouts/15/Doc.aspx?sourcedoc=%7B2d8d2cdb-ba5a-4efb-8339-e719e2f3b608%7D&action=view&wdAccPdf=0&wdparaid=71D3FDD).

## Summary of Requirements
 - Character name, base attributes, and `Damage` should be editable
   - Base Attributes
     - `Strength`
     - `Dexterity`
     - `Mind`
     - `Presence`
 - Character combat attribute `Tenacity` should be incrementable
 - Character can be exported and imported
 - Compute and display combat attributes
   - `Vitality`: calculated as `Strength` + 3
   - `Evasion`: calculated as `Dexterity` + 10
   - `Armor`: calculated as `Dexterity` + 10
   - `Alacrity`: calculated as `Dexterity` + `Mind`
   - `Tenacity`: calcualted as `Presence` + 1
   - `Power`: (not used. Should always be zero)
 - Character can train any skill
   - Skills have Ranks
     - Rank 0: Untrained
     - Rank 1: Novice
     - Rank 2: Apprentice
     - Rank 3: Adept
     - Rank 4: Expert
     - Rank 5: Master
   - Skills are categorized under a base attribute and can never be greater than the base attribute the skill is associated with.
     - `Strength`
       - `Fighting`
     - `Dexterity`
       - `Thievery`
       - `Stealth`
       - `Archery`
     - `Mind`
       - `Learned`
       - `Survival`
       - `Perception`
       - `Apothecary`
     - `Presence`
       - `Intimidation`
       - `Performance`
       - `Manipulation`
       - `Insight`
       - `Power`

## Install

From the command line run:

 `npm i`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

