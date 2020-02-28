import React from 'react'
import PropTypes from 'prop-types'
import Select from '../../Select'
import cn from 'classnames'
import styles from './Terms-Field.module.scss'

const TermsField = ({ terms, challenge, onUpdateMultiSelect }) => {
  const mapOps = item => ({ label: item, value: item })
  return (
    <div className={styles.row}>
      <div className={cn(styles.field, styles.col1)}>
        <label htmlFor='terms'>Terms  :</label>
      </div>
      <div className={cn(styles.field, styles.col2)}>
        <input type='hidden' />
        <Select
          id='track-select'
          multi
          options={terms.map(mapOps)}
          simpleValue
          value={challenge.terms.join(',')}
          onChange={(value) => onUpdateMultiSelect(value, 'terms')}
        />
      </div>
    </div>
  )
}

TermsField.propTypes = {
  challenge: PropTypes.shape().isRequired,
  terms: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdateMultiSelect: PropTypes.func.isRequired
}

export default TermsField
