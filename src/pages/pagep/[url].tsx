import { useRouter } from 'next/router';
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Pagep() {
  const router = useRouter();

  const { url } = router.query;
  const { data: page, error } = useSWR(`${url}`, fetcher);
  if(!page) return <div>loading...</div>;
  if(error) return <div>failed to load</div>;
  console.log(page);
  return(
    <div>
      <h1>Pagep</h1>
    </div>
  )
}