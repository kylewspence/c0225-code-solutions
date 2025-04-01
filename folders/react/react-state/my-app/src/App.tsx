import { Header } from './Header';
import { Image } from './Image';
import { Caption } from './Caption';
import { Description } from './Description';
import { Button } from './Button';
import './App.css';

const imageSrcs = ['/Snowboarding.jpeg', '/Sunset.jpeg'];
const imageCaptions = ['A Beautiful Image of the Mountains', 'Sunsets in Cali'];
const imageDescriptions = [
  'A picture I took from the top of Big Bear last time I went snowboarding.',
  'A beautiful sunset down in San Clemente earlier this year.',
];

export default function App() {
  return (
    <>
      <Header text="React Image Bank" />
      <Image srcs={imageSrcs} />
      <Caption captions={imageCaptions} />
      <Description descriptions={imageDescriptions} />
      <Button label="Click for Next Image" />
    </>
  );
}
