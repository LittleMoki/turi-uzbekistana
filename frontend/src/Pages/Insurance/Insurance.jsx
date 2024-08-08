import Script from 'next/script'

const Insurance = () => {
	return (
		<section>
			<div>Insurance</div>
			<div id='che-smallWidget' data-initialized='true'></div>
			<Script
				id='cheFormScript'
				data-che-options='{"partnerId":"11329","countryGroups":["all-world"],"isFrame":"true","isLogo":"false"}'
				src='https://static.cherehapa.ru/widgets/smallWidget.min.js'
			></Script>
		</section>
	)
}

export default Insurance
