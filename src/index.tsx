//@ts-nocheck
import { ActionPanel, Detail, List, Action } from "@raycast/api";
import { useState } from "react";
import fetch from "node-fetch";
import useSWR from 'swr'


export default function Command() {
  const fetcher = (...args: any) => fetch(...args).then(res => res.json())
  const [searchText, setSearchText] = useState<string>();

  const { data, error } = useSWR(`https://api.scryfall.com/cards/search?q=${searchText}`, fetcher)

  return (
    <List onSearchTextChange={setSearchText} throttle={true}>
      {data?.data?.map((card) => {
        return (
          <List.Item
            title={card.name}
            accessories={[
              { text: card.mana_cost },
              { text: card.type_line },
            ]}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser url={card.scryfall_uri} />
              </ActionPanel>
            }
          />
        )
      })}
    </List>
  );
}
