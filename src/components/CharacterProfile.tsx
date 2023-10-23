import React, { useEffect, useMemo, useState } from "react";
import { Typography, Col, Row, Button, message } from 'antd'
import { Character } from "../lib/types";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateCharacter } from "../queries";
import CharacterProfileBase from "./CharacterProfileBase";
import CharacterProfileCombat from "./CharacterProfileCombat";
import CharacterProfileSkills from "./CharacterProfileSkills";
import EditCharacterModal from "./EditCharacterModal";

export default function CharacterProfile(props: { character: Character }) {
  const { character  } = props;

  const { Title, Paragraph } = Typography;

  const { mutate: updateCharacter } = useUpdateCharacter();

  // Calculated Styles - The background images are not all the same dimensions
  const divStyle: React.CSSProperties = useMemo(() => ({
    marginTop: 20,
    backgroundImage: 'url(' + character?.image + ')',
    backgroundSize: 'cover',
  }), [character]);
  const rowStyle: React.CSSProperties = useMemo(() => ({
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }), [])
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      divStyle.aspectRatio = (img.width / img.height) ;
      rowStyle.aspectRatio = divStyle.aspectRatio
    }
    img.src = character ? character.image : '';  
  }, [character, divStyle, rowStyle])

  // Edit Character Modal
  const [isVisible, setVisible] = useState(false);

  // Tenacity
  const [isTenacityLoading, setTenacityLoading] = useState(false);
  const handleAddTenacity = () => {
    setTenacityLoading(true);
    updateCharacter(
      {
        ...character,
        combat: {
          ...character.combat,
          tenacity: character.combat.tenacity + 1
        }
      },
      {
        onSuccess: () => {
          setTenacityLoading(false);
        },
        onError: () => {
          setTenacityLoading(false);
          message.error('Failed to update Character!');
        }
      }
    )
  }
  
  return (
    <div style={{ ...(character ? divStyle : {})}}>
      <Row style={{ ...(character ? rowStyle : {}) }}>
        <Col style={{ padding: 20 }}>
          <Row wrap={false} justify="center">
            <Col flex="none">
              <Title><img alt={character.name} style={{ paddingRight: 30 }} src={character.icon} />{character.name}</Title>
            </Col>
            <Col flex="auto">
              <Button style={{ float: 'right'}} icon={<EditOutlined onClick={() => setVisible(true)}/>} />
            </Col>
          </Row>
          <Row wrap={false}>
            <Col>
              <Title level={2}>{character.title}</Title>
            </Col>
            <Col flex="auto">
              <div style={{ float: 'right', whiteSpace: 'nowrap' }}>
                <Title level={4}>Current Damage: {character.damage} <Button size="large" type="primary" loading={isTenacityLoading} style={{ marginLeft: 10}} onClick={handleAddTenacity}>Increment Tenacity</Button></Title>
              </div>
            </Col>
          </Row>
          
          
          <Paragraph>{character.description}</Paragraph>

          <CharacterProfileBase character={character} />

          <CharacterProfileCombat character={character} />
          
          <CharacterProfileSkills character={character} />
        </Col>
      </Row>
      <EditCharacterModal character={character} isVisible={isVisible} setVisible={setVisible} />
    </div>
  );
}
