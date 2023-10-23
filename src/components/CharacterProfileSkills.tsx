import { Button, Form, Typography, message } from 'antd'
import { Character } from '../lib/types';
import { useUpdateCharacter } from '../queries';
import { useState } from 'react';

export default function CharacterProfileBase( props: { character: Character }) {
  const { character } = props;

  const { Title, Paragraph } = Typography;
  
  const { mutate: updateCharacter } = useUpdateCharacter();
  
  // Skill Data Structure
  type CategorySkills = {
    [category: string]: {
      [skill: string]: boolean;
    }
  }

  // Skill Training
  const [loadingStates, setLoadingStates] = useState<CategorySkills>({
    'strength': {'fighting': false},
    'dexterity': {'thievery': false, 'stealth': false, 'archery': false},
    'mind': {'learned': false, 'survival': false, 'perception': false, 'apothecary': false},
    'presence': {'intimidation': false, 'performance': false, 'manipulation': false, 'insight': false}
  });
  const setLoading = (category: string, skill: string, value: boolean) => {
    loadingStates[category][skill] = value;
    setLoadingStates({...loadingStates})
  }
  const handleTraining = (category: keyof Character['base'], skill: keyof Character['skills']) => () => {
    if (character.skills[skill] < character.base[category]) { 
      setLoading(category, skill, true);
      character.skills[skill] = character.skills[skill] + 1;
      updateCharacter(
        {
          ...character
        }, {
          onSuccess: () => {
            setLoading(category, skill, false);
          },
          onError: () => {
            setLoading(category, skill, false);
            message.error('Failed to update Character!');
          }
        }
      );
    } else {
      message.warning(`${capitalize(skill)} cannot excede ${capitalize(category)}`);
    }
  }
  
  const getRank = (num: number) => {
    switch (num) {
      case 0: return 'Untrained';
      case 1: return 'Novice';
      case 2: return 'Apprentice';
      case 3: return 'Adept';
      case 4: return 'Expert';
      case 5: return 'Master';
    }
  }

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  return (
    <>
      <Title level={4}>Skills</Title>
      <Paragraph>
        {Object.entries(loadingStates).map(([category, skills]) => (
          <div key={category}>
            <Title level={5} style={{ paddingLeft: 40 }}>{category.charAt(0).toUpperCase() + category.slice(1)}</Title>
            { Object.entries(skills).map(([skill, isLoading]) => (
              <Form.Item key={skill} label={skill.charAt(0).toUpperCase() + skill.slice(1)} labelCol={{ span: 4}} style={{ margin: 0 }}>
                <Button size="small" loading={isLoading} style={{ float: 'right'}} onClick={handleTraining(category as keyof Character['base'], skill as keyof Character['skills'])}>Train</Button>
                {`Rank ${character.skills[skill as keyof Character['skills']]}: ${getRank(character.skills[skill as keyof Character['skills']])}`}
              </Form.Item>
            ))}
          </div>
        ))}
      </Paragraph>
    </>
  );
}