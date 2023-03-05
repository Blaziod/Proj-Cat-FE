import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as apiservice from '../services/apiservice'
import { useStudentLoggedIn } from '../hooks/useProtected'
import { useAppContext } from '../components/AppContext'
import { constants } from '../utils'

const Unknown = null
const Yes = true
const No = false

// A topic structure
const newTopic = () => ({
	title: '',
	isVerifying: false,
	hasBeenVerified: false,
	isDuplicate: Unknown
})

export default function ProposeTopic() {
	useStudentLoggedIn()

	const [appstate] = useAppContext()

	// a Tuple of 3 topics
	const [topics, _s] = useState([newTopic(), newTopic(), newTopic()])

	// a special setter to help with updating Tuple state of topic
	function setTopics(elementPosition, updater) {
		if (elementPosition < 1 || elementPosition > 3 || typeof updater !== 'function')
			throw Error('Invalid tuple access')
		const index = elementPosition - 1
		_s(prevtopics => {
			const topicsCopy = [...prevtopics]
			topicsCopy[index] = updater(topicsCopy[index])
			return topicsCopy
		})
	}
	// get a topic at an index
	function getTopic(elementPosition) {
		if (elementPosition < 1 || elementPosition > 3) throw Error('Invalid tuple access')
		return topics[elementPosition - 1]
	}

	const [isRequesting, setIsRequesting] = useState(false)

	let navigate = useNavigate()

	const uploadTopics = () => {
		apiservice
			.proposeTopics({
				matricNo: appstate.user.matricNo,
				topics: [getTopic(1).title, getTopic(2).title, getTopic(3).title]
			})
			.then(data => {
				console.log(data)
				toast(data.message)
				// should navigate to student dashboard
				navigate(constants.routes.studentDash)
			})
			.catch(errData => {
				console.log(errData)
				toast(errData.message)
			})
	}

	const hasDuplicateTopic = () =>
		new Promise((mainResolve, mainReject) => {
			const topicsVerificationPromise = topics.map((_, index) => {
				return new Promise((resolve, reject) => {
					const normalizedIndex = index + 1
					setTopics(normalizedIndex, t => ({ ...t, isVerifying: true }))
					apiservice
						.verifyTopic(getTopic(normalizedIndex).title)
						.then(response => {
							setTopics(normalizedIndex, t => ({
								...t,
								isDuplicate: response.body.isDuplicate
							}))
							resolve(response.body.isDuplicate)
						})
						.catch(err => reject(err))
						.finally(() => {
							setTopics(normalizedIndex, t => ({ ...t, isVerifying: false }))
						})
				})
			})

			Promise.allSettled(topicsVerificationPromise).then(results => {
				console.log(results)
				if (results.some(result => result.status === 'rejected'))
					mainReject(results.find(result => result.status === 'rejected').reason)
				else mainResolve(results.some(isDuplicateResult => isDuplicateResult.value === Yes))    
			})
		})

	const handleSubmit = e => {
		e.preventDefault()
		setIsRequesting(true)
		// do a topic verification before uploading the topics for review
		// verifyTopics().then(uploadTopics)

		hasDuplicateTopic()
			.then(foundDuplicate => {
				if (!foundDuplicate) {
					uploadTopics()
				} else {
					toast('One or more topics have already been approved for others.')
				}
			})
			.catch(err => {
				console.log(err)
				toast(err.message)
			})
			.finally(() => setIsRequesting(false))
	}

	return (
		<div className='auth-form-container'>
			<h2 className='app-container'>Project Topic Area</h2>
			<form className='login-form' onSubmit={handleSubmit}>
				{topics.map((topic, index) => {
					const normalizedIndex = index + 1
					const topicI = 'topic' + normalizedIndex

					return (
						<label key={topicI} htmlFor={topicI}>
							{' '}
							Project Topic {normalizedIndex}
							<div
								className={`propose-topic-input-wrapper ${
									topic.isVerifying ? 'propose-topic-input-wrapper-checking' : ''
								}`}
							>
								<input
									value={topic.title}
									onChange={e =>
										setTopics(normalizedIndex, topicDeets => ({
											...topicDeets,
											title: e.target.value
										}))
									}
									type={topicI}
									placeholder={`Type in a title for project topic ${normalizedIndex}`}
									id={topicI}
									name={topicI}
								/>
								{!topic.isVerifying && (topic.isDuplicate === Unknown ? (
									<></>
								) : topic.isDuplicate === Yes ? (
									<span className='invalid-topic' title='duplicate topic'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-6 h-6'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
											/>
										</svg>
									</span>
								) : (
									<span className='valid-topic'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='w-6 h-6'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
											/>
										</svg>
									</span>
								))}
							</div>
						</label>
					)
				})}
				<button className='register-submit-btn' type='submit' disabled={isRequesting}>
					Submit
				</button>
			</form>
		</div>
	)
}
