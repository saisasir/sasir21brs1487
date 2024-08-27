import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import KeyJson from './keys.json';
import { updateMove } from './service';

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {

	const [json, setJson] = useState(KeyJson);
	const [selected, setSelected] = useState({ key: '', value: '' });
	const [activePiece, setActivePiece] = useState('A');
	const [history, setHistory] = useState([]);
	const [active, setActive] = useState('');

	useEffect(() => {
		setJson(json);
	}, [json])

	const onSelect = (dict) => {

		setActive(dict.key);

		const checkActivePiece = () => {
			return activePiece === dict.value.split('-')[0];
		}

		const updatePieceMove = () => {
			updateMove(dict, json, selected, activePiece, history)
				.then(res => {
					if (res.status === 200) {
						setJson(res.data.json);
						setActivePiece(res.data.activePiece);
						setHistory(res.data.history);
					}
				})
				.catch(err => {
					if (err.response.status === 400) {
						setActivePiece(err.response.data.activePiece);
						toast.error(err.response.data.message);
					} else {
						toast.error(err.message);
					}
				})
		}

		if (checkActivePiece()) {
			if (dict.value !== '') {
				setSelected(dict);
			} else {
				updatePieceMove();
			}
		} else if (selected.value.split('-')[0] === activePiece && dict.value.split('-')[0] !== activePiece) {
			updatePieceMove();
		} else {
			toast.error('Can\'t make moves consecutively');
		}

	}

	return (
		<div className='App'>
			<ToastContainer />
			<div className='container'>
				<div className='row mt-5 mb-2'>
					<h4>Current Player: {activePiece} </h4>
				</div>
				<div className='row justify-content-center'>
					{
						json?.length > 0 && json.map(k => <div className={`col-2 ${active === k.key && 'active'} ${k.value.startsWith('A') ? 'fontRed' : 'fontBlue'}`} key={k.key} onClick={() => onSelect(k)}>{k.value}</div>)
					}
				</div>
				<div className='row my-5'>
					<h4 className='text-start'>Move History: </h4>
					{
						history?.map(h => <p className='text-start'>{h}</p>)
					}
				</div>
			</div>
		</div>
	);
}

export default App;
