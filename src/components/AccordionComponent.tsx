'use client'
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function AccordionComponent() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion>
      <AccordionItem key="1" aria-label="Events" subtitle="Any event about recycling, global warming reduction, environmental protection..." title="Events">
        <ul className="list-disc">
          <li>Sustainable Projects through Tokyo Marathon 2024 <u><a href="https://www.marathon.tokyo/en/about/sustainability/pdf/2024-en.pdf">More information</a></u></li>
          <li>Free Recycling Bazaar 2024 Spring held at Kashiwa Campus <u><a href="https://globe.u-tokyo.ac.jp/en/news/news_240406.html">More information</a></u></li>
          <li>Maintenance / Resilience TOKYO2024 - Recycling / Construction Waste Treatment Exhibition - Tokyo Big Sight <u><a href="https://www.jetro.go.jp/en/database/j-messe/tradefair/detail/132660">More information</a></u></li>
          <li>ゴミ拾いに関する東京でのボランティア <u><a href="https://activo.jp/tokyo/trash_pick_up">More information</a></u></li>
          <li>Protect environment - Various activiest <u><a href="https://www.greenbird.jp/schedule">More information</a></u></li>
          <li>Check for more <u><a href="https://all62.jp/alltokyoaction/index.html"></a></u> here...</li>

        </ul>
      </AccordionItem>
      <AccordionItem key="2" aria-label="FQA" subtitle="You can ask questions and get answers here" title="FQA">
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Help & Feedback"
        subtitle={
          <span>
            You can get help and give us feedback to improve the web app better
          </span>
        }
        title="Help & Feedback"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
