'use client';
import React, {useEffect, useRef, useState} from 'react';
import ReactJson from 'react-json-view'
import S from './styles';

const SOURCE_URL = 'https://bifrost.oddin.gg?brandToken=e4ba9020-57a2-4626-b668-e2d1987d853a&q=1707302986403'
interface BifrostProps {}
const getUpdateKey = () => (Math.random() + 1).toString(36).substring(7);
const jsonToQueryString = (json: any) => {
    let queryString = '';
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            if (Array.isArray(json[key as keyof typeof json])) {
                for (let i = 0; i < json[key as keyof typeof json].length; i++) {
                    let subObject = json[key as keyof typeof json][i];
                    for (let subKey in subObject) {
                        if (subObject.hasOwnProperty(subKey)) {
                            queryString += encodeURIComponent(key + '[' + i + '].' + subKey) + '=' + encodeURIComponent(subObject[subKey]) + '&';
                        }
                    }
                }
            } else {
                queryString += encodeURIComponent(key) + '=' + encodeURIComponent(json[key as keyof typeof json]) + '&';
            }
        }
    }
    return queryString.slice(0, -1);
}
const generateData = () => {
    const data: any = {
        bets: []
    };
    const betsCount = Math.floor(Math.random() * 3) + 1;

    new Array(betsCount).fill("").forEach(() => {
        data.bets.push({
            matchId: Math.floor(Math.random() * 10000) + 1,
            commandId: Math.floor(Math.random() * 10000) + 1,
            betValue: Math.floor(Math.random() * 100) + 1,
            betCurrency: Math.random() > 0.5 ? 'euro' : 'dollar',
        })
    })

    return data;
}
const Bifrost = ({ }: BifrostProps) => {
    const [updateKey, setUpdateKey] = useState(getUpdateKey());
    const [data, setData] = useState(generateData());
    const [loading, setLoading] = useState(true)
    const iframeRef = useRef(null);

    useEffect(() => {
        setData(generateData());
    }, [updateKey])

    const reloadIframe = () => {
        setUpdateKey(getUpdateKey())
        setLoading(true);
    }

    const iframeUrlParams = jsonToQueryString(data);
    const iframeHeight = typeof window !== "undefined" ? `${window?.innerHeight}px` : '500px';
    const iframeSrc = `${SOURCE_URL}&${iframeUrlParams}`;

    return (
    <S.Container>
        <S.ControlPanel>
            <ReactJson
                src={data}
                theme="twilight"
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
            />
            <S.IframeSrc>{iframeSrc}</S.IframeSrc>
        </S.ControlPanel>
        <S.Content>
            <S.ServiceIframe
               onLoad={() => setLoading(false)}
               key={updateKey}
               ref={iframeRef}
               width="100%"
               height={iframeHeight}
               src={iframeSrc}
            />
            <S.LoaderWrapper isLoading={loading}>
                <S.Loader/>
            </S.LoaderWrapper>
        </S.Content>
        <S.ReloadButton onClick={reloadIframe}>Reload</S.ReloadButton>
    </S.Container>
)};

export default Bifrost;
