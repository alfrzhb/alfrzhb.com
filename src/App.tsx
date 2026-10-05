import { Header, Hero, About } from './components';
import { useState } from 'react';
import { SelectedWork, Experience, Learning, Writing, Archive, Contact, Footer, DetailDialog } from './sections';
import type { Detail } from './data';

export default function App() {
  const [detail, setDetail] = useState<Detail | null>(null);
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content"><Hero /><About /><SelectedWork onOpen={setDetail} /><Experience /><Learning /><Writing onOpen={setDetail} /><Archive onOpen={setDetail} /><Contact /></main><Footer /><DetailDialog detail={detail} onClose={()=>setDetail(null)} /></>;
}
